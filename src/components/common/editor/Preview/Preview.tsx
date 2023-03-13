import React from 'react';
import { Stage, Layer } from 'react-konva';
import useElementResize from '../../../../hooks/useElementSize';
import { Node } from '../../../../types/editor';
import { getResizeScale } from '../../../../utils/editor/scale';
import ShapePicker2 from '../ShapePicker/ShapePicker2';

export type Props = {
  stageWidth: number;
  stageHeight: number;
  nodes: Node[];
};

function Preview({ stageWidth, stageHeight, nodes }: Props) {
  const { size, divRef } = useElementResize();

  const scale = getResizeScale(
    { width: stageWidth, height: stageHeight },
    { width: size.width, height: size.width },
    1
  );

  return (
    <div ref={divRef} style={{ width: '100%' }}>
      {!(size.width === 0 && size.height === 0) && (
        <Stage
          width={stageWidth * scale}
          height={stageHeight * scale}
          style={{ border: '1px solid black' }}
          scaleX={scale}
          scaleY={scale}
        >
          <Layer>
            {nodes.map(node => (
              <ShapePicker2 key={node.id} {...node} />
            ))}
          </Layer>
        </Stage>
      )}
    </div>
  );
}

export default Preview;
