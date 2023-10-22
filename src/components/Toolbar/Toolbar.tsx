import React from 'react';
import {
  Toolbar as ToolbarComponent,
  ToolbarButton,
  Overflow,
  OverflowItem,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Menu,
  tokens,
  useIsOverflowItemVisible,
  useOverflowMenu,
} from '@fluentui/react-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { makeStyles } from '@griffel/react';
import { Navigation24Regular } from '@fluentui/react-icons';

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
    boxShadow: tokens.shadow4,
  },

  toolbarButton: {
    height: '48px',
    minWidth: '80px',
  },
  flexGrow: {
    flexGrow: 1,
  },
  linkStyles: {
    textDecorationLine: 'none',
    color: tokens.colorNeutralForeground1,
  },
  toolbarButtonContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    minWidth: 0,
    width: '100%',
    alignItems: 'end',
  },
});

const OverflowMenuItem: React.FC<{ id: string; href: string }> = props => {
  const { id, href } = props;
  const isVisible = useIsOverflowItemVisible(id);
  const router = useRouter();

  if (isVisible) {
    return null;
  }

  const handleClick = () => {
    router.push(href);
  };

  return <MenuItem onClick={handleClick}>{id}</MenuItem>;
};

const OverflowMenu: React.FC<{ items: Array<{ content: string; href: string }> }> = ({ items }) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

  const toolbarStyles = useToolbarStyles();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <ToolbarButton
          aria-label="More"
          icon={<Navigation24Regular />}
          ref={ref}
          className={toolbarStyles.toolbarButton}
        />
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {items.map(item => {
            return <OverflowMenuItem key={item.content} id={item.content} href={item.href} />;
          })}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
const toolbarItems = [
  { content: 'About', href: '/about' },
  { content: 'Music', href: '/music' },
  { content: 'Contact', href: '/contact' },
  { content: 'Live', href: '/live' },
  { content: 'Shop', href: '/shop' },
];

export const Toolbar = () => {
  const router = useRouter();
  const toolbarStyles = useToolbarStyles();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <ToolbarComponent className={toolbarStyles.root}>
      <Link href="/" passHref>
        <ToolbarButton className={toolbarStyles.toolbarButton}>
          <h1>Nýx</h1>
        </ToolbarButton>
      </Link>
      <Overflow>
        <div className={toolbarStyles.toolbarButtonContainer}>
          {toolbarItems.map((item, index) => (
            <OverflowItem key={index} id={item.content}>
              <ToolbarButton className={toolbarStyles.toolbarButton} onClick={() => handleNavigation(item.href)}>
                {item.content}
              </ToolbarButton>
            </OverflowItem>
          ))}
          <OverflowMenu items={toolbarItems} />
        </div>
      </Overflow>
    </ToolbarComponent>
  );
};
