import React from 'react';
import Konva from 'konva';
import ShapeList from '../ShapeList/ShapeList';
import useElementSize from '../../../hooks/useElementSize';
import Stage from '../Stage/Stage';
import * as Styled from './StageList.styles';
import StageControlBar from '../StageControlBar/StageControlBar';
import ShapeControlBar from '../ShapeControlBar/ShapeControlBar';
import TransformableLayer from '../../../components/editor/TransformableLayer/TransformableLayer';
import useTransform from '../../../hooks/editor/node/useTransform';
import { Stage as StageType } from '../../../utils/editor/node';
import StageSelector from '../../../components/editor/StageSelector/StageSelector';
import useSelect from '../../../hooks/editor/stage/useSelect';

type Props = {
  setRef: (id: string, node: Konva.Layer | null) => void;
  items: StageType[];
};

function StageList({ setRef, items }: Props) {
  const { size, ref } = useElementSize<HTMLDivElement>();
  const { transformNodes } = useTransform();
  const { selectStage } = useSelect();

  const handleStageDeselect =
    (prevStage: StageType, nextStage: StageType) => () => {
      if (nextStage) {
        selectStage(nextStage);
      } else if (prevStage) {
        selectStage(prevStage);
      } else {
        selectStage(null);
      }
    };

  return (
    <Styled.Grid ref={ref} rowGap={3}>
      <ShapeControlBar />
      {items.map((stage, index) => {
        const prevStage = items[index - 1];
        const nextStage = items[index + 1];

        return (
          <div key={stage.id}>
            <StageControlBar
              stage={stage}
              prevStage={prevStage}
              nextStage={nextStage}
            />

            <StageSelector
              onSelect={() => selectStage(stage)}
              onDeselect={handleStageDeselect(prevStage, nextStage)}
            >
              <Stage
                stage={stage}
                key={stage.id}
                parentSize={size}
                parentRatio={0.65}
              >
                <TransformableLayer
                  setRef={layer => setRef(stage.id, layer)}
                  onTransform={transformNodes}
                >
                  {({ attachNode, detachNode }) => (
                    <ShapeList
                      updateTransformer={(konvaNode, id, isSelected) =>
                        isSelected ? attachNode(konvaNode) : detachNode(id)
                      }
                      items={stage.children}
                    />
                  )}
                </TransformableLayer>
              </Stage>
            </StageSelector>
          </div>
        );
      })}
    </Styled.Grid>
  );
}

export default StageList;
