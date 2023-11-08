import React, { useRef, useState } from 'react';
import { Input, Button } from '@fluentui/react-components';

export const NewsLetter = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputEl = useRef<any>(null);
  const [message, setMessage] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subscribe = async (e: any) => {
    e.preventDefault();

    const res = await fetch('/api/newsletterSubscribe', {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error } = await res.json();

    if (error) {
      setMessage(error);
      return;
    }

    inputEl.current.value = '';
    setMessage('Success! 🎉 You are now subscribed to the newsletter.');
  };

  return (
    <form onSubmit={subscribe} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px' }}>
      <h2>Subscribe to our newsletter</h2>
      <div>{"I'll only send emails when new content is posted. No spam."}</div>
      <div style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'end' }}>
        <Input placeholder="you@awesome.com" type="email" required ref={inputEl} style={{ flexGrow: '1' }} />
        <Button type="submit" appearance="primary">
          {'✨ Subscribe 💌'}
        </Button>
      </div>
      {message && <div style={{ color: message.includes('Success') ? 'green' : 'red' }}>{message}</div>}
    </form>
  );
};