import React from 'react';
import MuiTabs, { TabsProps } from '@mui/material/Tabs';
import MuiTab, { TabProps } from '@mui/material/Tab';

type Props = {
  orientation?: TabsProps['orientation'];
  items: (TabProps & { label: string })[];
  onSelect: (index: number) => void;
  selectedIndex: number | false;
};

function Tabs({ items, onSelect, orientation, selectedIndex }: Props) {
  const handleSelect = (event: React.SyntheticEvent, newValue: number) => {
    onSelect(newValue);
  };

  return (
    <MuiTabs
      onChange={handleSelect}
      orientation={orientation}
      value={selectedIndex}
    >
      {items.map((labelProps, index) => (
        <MuiTab key={index} {...labelProps} />
      ))}
    </MuiTabs>
  );
}

export default Tabs;
