import twilio from 'twilio';
import type { NextApiRequest, NextApiResponse } from 'next';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phoneNumber } = req.body;

    // Define a standard message for new sign-ups
    const message = 'Thank you for signing up for our newsletter!';

    // Send the message via Twilio
    try {
      const sentMessage = await client.messages.create({
        body: message,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
      });

      return res.status(200).json({ message: 'Sign-up successful!', sid: sentMessage.sid });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Sign-up failed.' + error });
    }
  }

  return res.status(405).end();
}
