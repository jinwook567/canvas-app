import React from 'react';
import Masonry from '@mui/lab/Masonry';
import { IconButton } from '@mui/material';
import Preview, { Props as PreviewProps } from '../../Preview/Preview';

type Props = {
  items: PreviewProps[];
  onClick: (arg: PreviewProps) => void;
};

function TemplateList({ items, onClick }: Props) {
  return (
    <Masonry columns={2}>
      {items.map((item, index) => (
        <IconButton key={index} onClick={() => onClick(item)}>
          <Preview {...item} />
        </IconButton>
      ))}
    </Masonry>
  );
}

export default TemplateList;
