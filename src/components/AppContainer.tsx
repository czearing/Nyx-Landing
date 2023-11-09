import { ReactNode } from 'react';
import { Toolbar } from './Toolbar';
import { Footer } from './Footer';

const appContainerStyles: React.CSSProperties = {
  height: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
};
const childWrapperStyles: React.CSSProperties = { margin: '25px', flexGrow: '1' };

export const AppContainer = (props: { children: ReactNode }) => {
  return (
    <div style={appContainerStyles}>
      <Toolbar />
      <div style={childWrapperStyles}>{props.children}</div>
      <Footer />
    </div>
  );
};
