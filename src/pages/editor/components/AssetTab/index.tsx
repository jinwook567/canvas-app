import React from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import ImageIcon from '@mui/icons-material/Image';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import InterestsIcon from '@mui/icons-material/Interests';
import Tabs from 'components/common/Tabs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useRecoilState } from 'recoil';
import { selectedTabState, tabValue } from 'recoils/editor/atoms';

function AssetTab() {
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState);

  const items = [
    { label: '이미지', icon: <ImageIcon />, value: tabValue.assetImage },
    {
      label: '템플릿',
      icon: <GridViewIcon />,
      value: tabValue.assetTemplate,
    },
    {
      label: '텍스트',
      icon: <FormatColorTextIcon />,
      value: tabValue.assetText,
    },
    { label: '도형', icon: <InterestsIcon />, value: tabValue.assetFigure },
    {
      label: '업로드',
      icon: <CloudUploadIcon />,
      value: tabValue.assetUpload,
    },
  ];
  const index = items.findIndex(item => item.value === selectedTab);

  return (
    <Tabs
      items={items.map(({ label, icon }) => ({ label, icon }))}
      selectedIndex={index !== -1 && index}
      orientation="vertical"
      onSelect={index => setSelectedTab(items[index].value)}
    />
  );
}

export default AssetTab;
