/* eslint-disable no-param-reassign */
import React, { RefObject } from 'react';
import { useRecoilValue } from 'recoil';
import Konva from 'konva';
import { KonvaNodeEvents, Layer as LayerComponent } from 'react-konva';
import { Shape } from '../../../types/editor';
import Node from '../../../components/editor/Node/Node';
import { Text as TextClass } from '../../../utils/editor/shapes';
import Text from '../Text/Text';
import useSelect from '../../../hooks/editor/node/useSelect';
import usePressedKey from '../../../hooks/editor/global/usePressedKey';
import { selectedStageIdState } from '../../../recoil/editor/atoms';
import KonvaMatcher from '../../../components/editor/KonvaMatcher/KonvaMatcher';
import useTransform from '../../../hooks/editor/node/useTransform';
import RefProvider from '../../../components/editor/RefProvider/RefProvider';

type CanvasShape = Pick<
  Shape,
  'id' | 'config' | 'setConfig' | 'component' | 'children'
>;

type Props = {
  setNode: (node: Konva.Layer | null) => void;
  shapes: CanvasShape[];
  trRef: RefObject<Konva.Transformer>;
};

function CanvasLayer({ setNode, shapes, trRef }: Props) {
  const selectedStageId = useRecoilValue(selectedStageIdState);
  const { isSelected, appendSelect, changeSelect, deselect } = useSelect();
  const { transformNodes } = useTransform();
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

  return (
    <LayerComponent ref={setNode}>
      {shapes.map(shape => (
        <RefProvider key={shape.id}>
          {ref => {
            const render = (
              <KonvaMatcher
                id={shape.id}
                config={{ ...shape.config, draggable: true }}
                component={shape.component}
                setNode={node => {
                  ref.current = node;
                }}
                {...nodeEvents(isSelected(shape.id), shape.id)}
                childNodes={shape.children}
              />
            );
            return (
              <Node
                key={shape.id}
                isSelected={isSelected(shape.id)}
                isInSelectedStage={
                  ref.current?.getStage()?.id() === selectedStageId
                }
                select={() => changeSelect(shape.id)}
                deselect={() => deselect(shape.id)}
                render={
                  shape instanceof TextClass ? (
                    <Text
                      isSelected={isSelected(shape.id)}
                      config={shape.config}
                      bounds={
                        shape.setConfig({
                          ...shape.config,
                          x:
                            shape.bounds.x *
                            (ref.current?.getStage()?.scaleX() || 1),
                          y:
                            shape.bounds.y *
                            (ref.current?.getStage()?.scaleY() || 1),
                        }).bounds
                      }
                      render={render}
                      node={ref.current as Konva.Text | null}
                    />
                  ) : (
                    render
                  )
                }
                updateTransformer={isSelected => {
                  if (!trRef.current) return;

                  trRef.current.nodes(
                    isSelected && ref.current
                      ? [...trRef.current.nodes(), ref.current]
                      : trRef.current
                          .nodes()
                          .filter(trNode => trNode.id() !== shape.id)
                  );
                  trRef.current.getLayer()?.batchDraw();
                }}
              />
            );
          }}
        </RefProvider>
      ))}
    </LayerComponent>
  );
}

export default CanvasLayer;