import React, { useRef, useState } from 'react';
import { Input, Button } from '@fluentui/react-components';
import { Body, Header } from '../Typography';

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
    <form
      onSubmit={subscribe}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        flexGrow: '1',
        maxWidth: '400px',
        width: '100%',
      }}
    >
      <Header>Get the Latest Tracks</Header>
      <Body>Exclusive updates. No spam.</Body>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', width: '100%', flexWrap: 'wrap' }}>
        <Input placeholder="Your email" type="email" required ref={inputEl} style={{ flexGrow: 1 }} />
        <Button type="submit" appearance="primary">
          Subscribe
        </Button>
      </div>
      {message && <div style={{ color: message.includes('Success') ? '#4CAF50' : '#F44336' }}>{message}</div>}
    </form>
  );
};
