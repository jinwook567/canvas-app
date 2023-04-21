import React from 'react';
import Masonry from '@mui/lab/Masonry';
import { IconButton } from '@mui/material';
import { Stage } from '../../../../utils/editor/shapes';
import Preview from '../Preview/Preview';

type Props = {
  items: Stage[];
  onClick: (arg: Stage) => void;
};

function TemplateList({ items, onClick }: Props) {
  return (
    <Masonry columns={2}>
      {items.map((item, index) => (
        <IconButton key={index} onClick={() => onClick(item)}>
          <Preview
            width={item.bounds.width}
            height={item.bounds.height}
            shapes={item.children}
          />
        </IconButton>
      ))}
    </Masonry>
  );
}

export default TemplateList;
