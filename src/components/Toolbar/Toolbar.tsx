import React from 'react';
import { Toolbar as ToolbarComponent } from '@fluentui/react-components';
import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const useToolbarStyles = makeStyles({
  root: {
    position: 'sticky',
    top: '0px',
    height: '48px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    flexShrink: 0,
    zIndex: 10000,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
  },
  linkStyles: {
    textDecorationLine: 'none',
    color: tokens.colorNeutralForeground1,
  },
});

export const Toolbar = () => {
  const toolbarStyles = useToolbarStyles();

  return (
    <ToolbarComponent className={toolbarStyles.root}>
      <h1>Logo</h1>
    </ToolbarComponent>
  );
};
