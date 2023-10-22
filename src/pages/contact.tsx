import * as React from 'react';
import { Input, Textarea, Field, Button } from '@fluentui/react-components';
import { SocialLinks } from '../components/SocialLinks/SocialLinks';

const Contact = () => {
  return (
    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
      <h1>Contact info</h1>
      <div style={{ maxWidth: '500px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <div
          style={{
            maxWidth: '500px',
            width: '100%',
            display: 'flex',
            gap: '10px',
            flexDirection: 'row',
            flexGrow: '1',
          }}
        >
          <Field label="Email" style={{ flexGrow: '1' }}>
            <Input placeholder="Please enter your email" />
          </Field>
          <Field label="Company" style={{ flexGrow: '1' }}>
            <Input placeholder="Please enter your company" />
          </Field>
        </div>
        <Field label="Subject" style={{ flexGrow: '1' }}>
          <Input placeholder="Please enter the subject" />
        </Field>
        <Field label="Message" style={{ flexGrow: '1' }}>
          <Textarea placeholder="Enter your message" />
        </Field>
        <Button appearance="primary" style={{ maxWidth: '50px' }}>
          Send
        </Button>
      </div>
      <div>For more direct or specific inquiries, feel free to reach out via email at contact@nyx.band</div>
      <SocialLinks />
    </div>
  );
};

export default Contact;
