import * as React from 'react';
import { NewsLetter } from '../NewsLetter';
import { customTheme } from '../../theme';
import { SocialLinks } from '../SocialLinks';
const footerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '50px',
  backgroundColor: customTheme.colorNeutralBackground2,
  color: '#fff',
  padding: '40px',
  textAlign: 'center',
  alignItems: 'center',
};

export const Footer = () => {
  return (
    <div style={footerStyles}>
      <NewsLetter />
      <SocialLinks />
    </div>
  );
};
