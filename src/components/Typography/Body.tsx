import * as React from 'react';
import { Text } from '@fluentui/react-components';

export const Body: React.FC = props => {
  return <Text style={{ color: '#CCCCCC', letterSpacing: '0.02em' }}>{props.children}</Text>;
};
