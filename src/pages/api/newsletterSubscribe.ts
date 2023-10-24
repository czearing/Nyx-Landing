import type { NextApiRequest, NextApiResponse } from 'next';
import Mailjet from 'node-mailjet';

const mailjetClient = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_API_SECRET,
});

type RequestBody = {
  email?: string;
};

type ResponseBody = {
  error?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<ResponseBody>) => {
  const { email } = req.body as RequestBody;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Create a new contact
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contactResponse: any = await mailjetClient.post('contact').request({ Email: email });

    // Check if the contact was created successfully
    if (contactResponse?.body?.Data?.length > 0) {
      const contactID = contactResponse.body.Data[0].ID;

      // Add the contact to a list
      await mailjetClient.post('listrecipient').request({
        ContactID: contactID,
        ListID: process.env.MAILJET_LIST_ID as string,
      });

      return res.status(201).json({});
    } else {
      throw new Error('Failed to create contact');
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Mailjet error', error.statusCode, error.message);

    // Define a default error message
    let errorMessage = 'An unexpected error occurred.';
    const statusCode = error.statusCode || 500;

    // If the error has a response and it's from Mailjet, parse it
    if (error.statusCode === 400) {
      if (error.message.includes('already exists')) {
        errorMessage = 'You are already subscribed to the newsletter.';
      } else {
        errorMessage = 'There was a problem with your subscription request.';
      }
    }

    return res.status(statusCode).json({ error: errorMessage });
  }
};
