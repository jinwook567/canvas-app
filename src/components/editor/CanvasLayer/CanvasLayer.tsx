import React, { RefObject } from 'react';
import Konva from 'konva';
import { Layer as LayerComponent } from 'react-konva';
import { Shape } from '../../../types/editor';
import Node from '../Node2/Node';
import { Text as TextClass } from '../../../utils/editor/shapes';
import Text from '../Text/Text';

type Props = {
  setNode: (node: Konva.Layer | null) => void;
  shapes: Pick<Shape, 'render' | 'id'>[];
  trRef: RefObject<Konva.Transformer>;
};

function CanvasLayer({ setNode, shapes, trRef }: Props) {
  return (
    <LayerComponent ref={node => setNode(node)}>
      {shapes.map(shape => (
        <Node
          key={shape.id}
          isSelected={false}
          render={
            shape instanceof TextClass ? (
              <Text
                isSelected={false}
                node={shape.node}
                render={shape.render()}
              />
            ) : (
              shape.render()
            )
          }
          updateTransformer={() => console.log('')}
        />
      ))}
    </LayerComponent>
  );
}

export default CanvasLayer;
