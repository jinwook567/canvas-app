import React from 'react';
import { Layer } from 'react-konva';
import Masonry from '@mui/lab/Masonry';
import { IconButton } from '@mui/material';
import KonvaMatcher from 'components/editor/KonvaMatcher';
import ResponsiveStage from 'components/editor/ResponsiveStage';
import DivSize from 'components/common/DivSize';
import { Stage } from 'utils/editor/node';

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
                  {item.children.map(child => (
                    <KonvaMatcher
                      key={child.id}
                      id={child.id}
                      component={child.component}
                      config={child.config}
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
