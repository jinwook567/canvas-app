import React from 'react';
import Konva from 'konva';
import { useElementSize } from 'shared/dom';
import Stage from 'pages/editor/components/Stage';
import * as Styled from 'pages/editor/components/StageList/styles';
import StageControlBar from 'pages/editor/components/StageControlBar';
import { Stage as StageType } from 'utils/editor/node';
import StageSelector from 'components/editor/StageSelector';
import useSelect from 'hooks/editor/stage/useSelect';
import ShapesLayer from 'pages/editor/components/ShapesLayer';
import { Box, Grid } from '@mui/material';

type Props = {
  setRef: (id: string, node: Konva.Layer | null) => void;
  items: StageType[];
};

function StageList({ setRef, items }: Props) {
  const { size, ref } = useElementSize<HTMLDivElement>();
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
    <Styled.Container ref={ref}>
      {items.map((stage, index) => {
        const prevStage = items[index - 1];
        const nextStage = items[index + 1];

        return (
          <Grid key={stage.id} mt={2} mb={2}>
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
                <ShapesLayer
                  items={stage.children}
                  setRef={layer => setRef(stage.id, layer)}
                />
              </Stage>
            </StageSelector>
          </Grid>
        );
      })}

      <Box component="hr" mt={2} />
    </Styled.Container>
  );
}

export default StageList;
