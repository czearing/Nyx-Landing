import * as React from 'react';
import { Title2 } from '@fluentui/react-components';

export const Header: React.FC = props => {
  return <Title2>{props.children}</Title2>;
};
