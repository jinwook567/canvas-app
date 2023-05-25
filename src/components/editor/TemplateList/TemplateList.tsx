import React from 'react';
import { Layer } from 'react-konva';
import Masonry from '@mui/lab/Masonry';
import { IconButton } from '@mui/material';
import { Stage } from '../../../utils/editor/shapes';
import KonvaComponent from '../KonvaComponent/KonvaComponent';
import ResponsiveStage from '../ResponsiveStage/ResponsiveStage';

type Props = {
  items: Stage[];
  onClick: (arg: Stage) => void;
};

function TemplateList({ items, onClick }: Props) {
  return (
    <Masonry columns={2}>
      {items.map((item, index) => (
        <IconButton key={index} onClick={() => onClick(item)}>
          <ResponsiveStage
            width={item.bounds.width}
            height={item.bounds.height}
            parentRatio={1}
            handleParentSize={size => ({ ...size, height: size.width })}
            style={{ border: '1px solid black' }}
            listening={false}
          >
            <Layer>
              {item.children.map(shape => (
                <KonvaComponent
                  key={shape.id}
                  id={shape.id}
                  component={shape.component}
                  config={shape.config}
                />
              ))}
            </Layer>
          </ResponsiveStage>
        </IconButton>
      ))}
    </Masonry>
  );
}

export default TemplateList;
