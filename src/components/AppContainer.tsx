import { ReactNode } from 'react';
import { Toolbar } from './Toolbar';
import { Footer } from './Footer';

const appContainerStyles = { height: '100%' };
const childWrapperStyles = { margin: '25px' };

export const AppContainer = (props: { children: ReactNode }) => {
  return (
    <div style={appContainerStyles}>
      <Toolbar />
      <div style={childWrapperStyles}>{props.children}</div>
      <Footer />
    </div>
  );
};
