import React, { useState } from 'react';
import {
  Stage as ReactKonvaStage,
  Layer as ReactKonvaLayer,
} from 'react-konva';
import { Template } from '../../../../types/editor';
import { applyScaleToNode, getScale } from '../../../../utils/editor';
import Node from '../../../Canvas/Node/Node';
import useStageSize from '../../../Canvas/useStageSize';

type Props = {
  template: Template;
  onClick: (template: Template) => void;
};

function CanvasThumbnail({ template, onClick }: Props) {
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const divRef = useStageSize({ setStageSize });

  const { width, height, nodes } = template;
  const scale = getScale({ width, height }, stageSize);

  return (
    <div ref={divRef}>
      {stageSize.width !== 0 && stageSize.height !== 0 && (
        <ReactKonvaStage
          width={width * scale}
          height={height * scale}
          style={{ border: '1px solid black' }}
          onClick={() => onClick(template)}
        >
          <ReactKonvaLayer>
            {nodes
              .map(node => applyScaleToNode({ node, scale }))
              .map(node => (
                <Node
                  key={node.id}
                  node={{ ...node, listening: false }}
                  trRef={{ current: null }}
                  isSelected={false}
                />
              ))}
          </ReactKonvaLayer>
        </ReactKonvaStage>
      )}
    </div>
  );
}

export default CanvasThumbnail;
