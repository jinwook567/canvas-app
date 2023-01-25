import React, { ReactElement } from 'react';
import { ListItemIcon, MenuItem, MenuList, Typography } from '@mui/material';

type Props = {
  tabList: { icon: ReactElement; name: '이미지' | '템플릿' | '텍스트' }[];
  onClick: (name: '이미지' | '템플릿' | '텍스트') => void;
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
