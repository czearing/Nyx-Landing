import * as React from 'react';
import { NewsLetter } from '../NewsLetter';
import { customTheme } from '../../theme';

const footerStyles: React.CSSProperties = {
  display: 'flex',

  flexDirection: 'column',
  backgroundColor: customTheme.colorNeutralBackground2,
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
