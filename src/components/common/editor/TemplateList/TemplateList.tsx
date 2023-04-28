import React from 'react';
import Masonry from '@mui/lab/Masonry';
import { IconButton } from '@mui/material';
import { Stage } from '../../../../utils/editor/shapes';
import Preview from '../Preview/Preview';
import KonvaComponent from '../../../editor/KonvaComponent/KonvaComponent';

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
            shapes={item.children.map(shape => (
              <KonvaComponent
                key={shape.id}
                id={shape.id}
                component={shape.component}
                config={shape.config}
              />
            ))}
          />
        </IconButton>
      ))}
    </Masonry>
  );
}

export default TemplateList;
