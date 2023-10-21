import React from 'react';
import { Toolbar as ToolbarComponent, ToolbarButton } from '@fluentui/react-components';
import Link from 'next/link';
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

  toolbarButton: {
    height: '48px',
  },
  flexGrow: {
    flexGrow: 1,
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
      <Link href="/" passHref>
        <h1>Nyx</h1>
      </Link>
      <div className={toolbarStyles.flexGrow} />
      <Link href="/about" passHref>
        <ToolbarButton className={toolbarStyles.toolbarButton}>About</ToolbarButton>
      </Link>
      <Link href="/music" passHref>
        <ToolbarButton className={toolbarStyles.toolbarButton}>Music</ToolbarButton>
      </Link>
      <Link href="/contact" passHref>
        <ToolbarButton className={toolbarStyles.toolbarButton}>Contact</ToolbarButton>
      </Link>
      <Link href="/live" passHref>
        <ToolbarButton className={toolbarStyles.toolbarButton}>Live</ToolbarButton>
      </Link>
      <Link href="/shop" passHref>
        <ToolbarButton className={toolbarStyles.toolbarButton}>Shop</ToolbarButton>
      </Link>
    </ToolbarComponent>
  );
};
