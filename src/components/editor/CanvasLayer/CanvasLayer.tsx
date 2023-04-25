import React, { RefObject } from 'react';
import { useRecoilValue } from 'recoil';
import Konva from 'konva';
import { KonvaNodeEvents, Layer as LayerComponent } from 'react-konva';
import { Shape } from '../../../types/editor';
import Node from '../Node/Node';
import { Text as TextClass } from '../../../utils/editor/shapes';
import Text from '../Text/Text';
import useSelect from '../../../hooks/editor/node/useSelect';
import usePressedKey from '../../../hooks/editor/global/usePressedKey';
import { selectedStageIdState } from '../../../recoil/editor/atoms';
import KonvaComponent from '../KonvaComponent/KonvaComponent';
import useTransform from '../../../hooks/editor/node/useTransform';

type CanvasShape = Pick<
  Shape,
  'id' | 'node' | 'config' | 'setConfig' | 'component' | 'children'
>;

type Props = {
  setNode: (node: Konva.Layer | null) => void;
  shapes: CanvasShape[];
  trRef: RefObject<Konva.Transformer>;
};

function CanvasLayer({ setNode, shapes, trRef }: Props) {
  const { isSelected, appendSelect, changeSelect, deselect } = useSelect();
  const pressedKeyRef = usePressedKey();

  const selectNode = (id: string) =>
    pressedKeyRef.current.Shift ? appendSelect(id) : changeSelect(id);

  const nodeEvents = (isSelected: boolean, id: string): KonvaNodeEvents => ({
    ...(!isSelected && {
      onClick: () => selectNode(id),
      onTouchStart: () => selectNode(id),
      onMouseDown: () => selectNode(id),
    }),
    onDragEnd: e => {
      const stage = e.target.getStage();
      if (!stage) return;

      transformNodes(
        [{ id: e.target.id(), config: e.target.attrs }],
        stage.id()
      );
    },
  });

  const selectedStageId = useRecoilValue(selectedStageIdState);

  const { transformNodes } = useTransform();

  const handleNode = <T extends Konva.Node>(node: T | null) => {
    if (!node) return;

    const stage = node.getStage();
    if (!stage) return;

    transformNodes([{ id: node.id(), node }], stage.id());
  };

  return (
    <LayerComponent ref={node => setNode(node)}>
      {shapes.map(shape => {
        const konvaComponent = (
          <KonvaComponent
            id={shape.id}
            config={{ ...shape.config, draggable: true }}
            component={shape.component}
            setNode={node => !shape.node && handleNode(node)}
            {...nodeEvents(isSelected(shape.id), shape.id)}
            childNodes={shape.children}
          />
        );
        return (
          <Node
            key={shape.id}
            isSelected={isSelected(shape.id)}
            isInSelectedStage={shape.node?.getStage()?.id() === selectedStageId}
            select={() => changeSelect(shape.id)}
            deselect={() => deselect(shape.id)}
            render={
              shape instanceof TextClass ? (
                <Text
                  isSelected={isSelected(shape.id)}
                  node={shape.node}
                  render={konvaComponent}
                />
              ) : (
                konvaComponent
              )
            }
            updateTransformer={isSelected => {
              if (!trRef.current) return;

              trRef.current.nodes(
                isSelected && shape.node
                  ? [...trRef.current.nodes(), shape.node]
                  : trRef.current
                      .nodes()
                      .filter(trNode => trNode.id() !== shape.id)
              );
              trRef.current.getLayer()?.batchDraw();
            }}
          />
        );
      })}
    </LayerComponent>
  );
}

export default CanvasLayer;
