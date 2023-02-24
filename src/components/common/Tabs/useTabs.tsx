import React, { useState } from 'react';
import { TabsProps } from '@mui/material/Tabs';
import { TabProps } from '@mui/material/Tab';
import Tabs from './Tabs';

type Props = {
  orientation?: TabsProps['orientation'];
  items: (TabProps & { label: string })[];
};

type UseTabs = [number, () => JSX.Element];

function useTabs({ orientation, items }: Props): UseTabs {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleSelect = (newValue: number) => {
    setSelectedIndex(newValue);
  };

  const renderTabs = () => (
    <Tabs
      orientation={orientation}
      items={items}
      onSelect={handleSelect}
      selectedIndex={selectedIndex}
    />
  );
  return [selectedIndex, renderTabs];
}

export default useTabs;
