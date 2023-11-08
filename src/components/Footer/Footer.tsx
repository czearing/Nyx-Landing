import * as React from 'react';
import { NewsLetter } from '../NewsLetter';

const footerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#333',
  color: '#fff',
  padding: '20px',
  textAlign: 'center',
  alignItems: 'center',
};

export const Footer = () => {
  return (
    <div style={footerStyles}>
      I am a footer
      <NewsLetter />
    </div>
  );
};
