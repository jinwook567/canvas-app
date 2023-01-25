import { ListItemIcon, MenuItem, MenuList, Typography } from '@mui/material';
import React, { ReactElement } from 'react';

type Props = {
  tabList: { icon: ReactElement; name: string }[];
  onClick: (name: string) => void;
  selectedTab: string;
};

function AssetTab({ tabList, onClick, selectedTab }: Props) {
  return (
    <MenuList>
      {tabList.map(tab => (
        <MenuItem
          key={tab.name}
          onClick={() => onClick(tab.name)}
          sx={{ flexDirection: 'column', alignItems: 'center' }}
          selected={selectedTab === tab.name}
        >
          <ListItemIcon sx={{ flexDirection: 'column', alignItems: 'center' }}>
            {tab.icon}
          </ListItemIcon>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {tab.name}
          </Typography>
        </MenuItem>
      ))}
    </MenuList>
  );
}

export default AssetTab;
