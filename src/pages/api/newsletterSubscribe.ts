// Importing the necessary libraries
import mailchimp from '@mailchimp/mailchimp_marketing';
import type { NextApiRequest, NextApiResponse } from 'next';

// Configuring Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER, // Assuming this is something like 'us1', 'us2' etc.
});

// The type for the request body
type RequestBody = {
  email?: string;
};

// The type for the response body
type ResponseBody = {
  error?: string;
};

// The main function to handle requests
export default async (req: NextApiRequest, res: NextApiResponse<ResponseBody>) => {
  const { email } = req.body as RequestBody;

  // Check if the email is provided
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Attempt to register the email with Mailchimp
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID as string, {
      email_address: email,
      status: 'subscribed',
    });

    return res.status(201).json({ error: '' }); // Success with no error message
  } catch (error: any) {
    // Improved error handling to check for the specific case when a user is already subscribed
    if (error.response && error.response.body && error.response.body.title === 'Member Exists') {
      return res.status(400).json({ error: 'You are already subscribed to the newsletter.' });
    }

    // General error handling
    return res.status(500).json({ error: error.message || 'An unexpected error occurred.' });
  }
};
