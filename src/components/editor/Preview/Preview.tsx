import React from 'react';
import { Stage, Layer } from 'react-konva';
import useElementResize from '../../../hooks/editor/useElementSize';
import { Node } from '../../../types/editor';
import ShapePicker2 from '../ShapePicker/ShapePicker2';

export type Props = {
  stageWidth: number;
  stageHeight: number;
  nodes: Node[];
};

function Preview({ stageWidth, stageHeight, nodes }: Props) {
  const { size, divRef } = useElementResize();

  return (
    <div ref={divRef} style={{ width: '100%' }}>
      <Stage
        width={stageWidth}
        height={stageHeight}
        scale={{ x: size.width / stageWidth, y: size.width / stageWidth }}
      >
        <Layer>
          {nodes.map(node => (
            <ShapePicker2 key={node.id} {...node} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default Preview;
