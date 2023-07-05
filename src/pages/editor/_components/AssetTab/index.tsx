import React from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import ImageIcon from '@mui/icons-material/Image';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import InterestsIcon from '@mui/icons-material/Interests';
import Tabs from 'components/common/Tabs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export type Props = {
  selectedTab: '이미지' | '템플릿' | '텍스트' | '도형' | '업로드';
  onSelect: (tab: Props['selectedTab']) => void;
};

function AssetTab({ selectedTab, onSelect }: Props) {
  const items = [
    { label: '이미지', icon: <ImageIcon /> } as const,
    { label: '템플릿', icon: <GridViewIcon /> } as const,
    { label: '텍스트', icon: <FormatColorTextIcon /> } as const,
    { label: '도형', icon: <InterestsIcon /> } as const,
    { label: '업로드', icon: <CloudUploadIcon /> } as const,
  ];
  const index = items.findIndex(item => item.label === selectedTab);

  return (
    <Tabs
      items={items}
      selectedIndex={index}
      orientation="vertical"
      onSelect={index => onSelect(items[index].label)}
    />
  );
}

export default AssetTab;
