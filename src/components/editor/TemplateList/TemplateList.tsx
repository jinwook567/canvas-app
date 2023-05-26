import React from 'react';
import { Layer } from 'react-konva';
import Masonry from '@mui/lab/Masonry';
import { IconButton } from '@mui/material';
import { Stage } from '../../../utils/editor/shapes';
import KonvaMatcher from '../KonvaMatcher/KonvaMatcher';
import ResponsiveStage from '../ResponsiveStage/ResponsiveStage';
import DivSize from '../../common/DivSize/DivSize';

type Props = {
  items: Stage[];
  onClick: (arg: Stage) => void;
};

function TemplateList({ items, onClick }: Props) {
  return (
    <Masonry columns={2}>
      {items.map((item, index) => (
        <IconButton key={index} onClick={() => onClick(item)}>
          <DivSize style={{ width: '100%', border: '1px solid black' }}>
            {size => (
              <ResponsiveStage
                parentSize={{ ...size, height: size.width }}
                size={item.bounds.size}
                parentRatio={1}
              >
                <Layer>
                  {item.children.map(shape => (
                    <KonvaMatcher
                      key={shape.id}
                      id={shape.id}
                      component={shape.component}
                      config={shape.config}
                    />
                  ))}
                </Layer>
              </ResponsiveStage>
            )}
          </DivSize>
        </IconButton>
      ))}
    </Masonry>
  );
}

export default TemplateList;
