import * as React from 'react';
import { Subtitle2 } from '@fluentui/react-components';

export const SubHeader: React.FC = props => {
  return <Subtitle2>{props.children}</Subtitle2>;
};
