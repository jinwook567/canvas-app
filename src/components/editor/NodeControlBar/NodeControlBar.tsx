import React from 'react';
import { Button, Typography } from '@mui/material';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';
import useGroup from '../../../hooks/editor/node/useGroup';
import useRemove from '../../../hooks/editor/node/useRemove';
import {
  selectedIdsState,
  stageClassesState,
} from '../../../recoil/editor/atoms';
import * as Styled from './NodeControlBar.styles';
import { Group } from '../../../utils/editor/shapes';

function NodeControlBar() {
  const { removeNodes } = useRemove();
  const { group, ungroup } = useGroup();
  const selectedIds = useRecoilValue(selectedIdsState);
  const stages = useRecoilValue(stageClassesState);

  const selectedShapes = _.chain(stages)
    .flatMap(stage =>
      stage.children.map(shape => ({ shape, stageId: stage.id }))
    )
    .filter(({ shape }) => selectedIds.includes(shape.id))
    .value();

  const isAllShapeInSameStage = selectedShapes.every(({ stageId }, index) =>
    selectedShapes[index + 1]
      ? stageId === selectedShapes[index + 1].stageId
      : true
  );

  return (
    <Styled.Grid padding={1} columnGap={1} container>
      <Button
        variant="outlined"
        disabled={selectedIds.length < 2 || !isAllShapeInSameStage}
        onClick={() =>
          group(
            selectedShapes.map(({ shape }) => shape.id),
            selectedShapes[0].stageId
          )
        }
      >
        <Typography variant="body2">그룹화</Typography>
      </Button>

      <Button
        variant="outlined"
        disabled={
          selectedShapes.length !== 1 ||
          !(selectedShapes[0].shape instanceof Group)
        }
        onClick={() =>
          ungroup(selectedShapes[0].shape.id, selectedShapes[0].stageId)
        }
      >
        <Typography variant="body2">그룹 해제</Typography>
      </Button>

      <Button
        variant="outlined"
        disabled={selectedIds.length === 0 || !isAllShapeInSameStage}
        onClick={() =>
          removeNodes(
            selectedShapes.map(({ shape }) => shape.id),
            selectedShapes[0].stageId
          )
        }
      >
        <Typography variant="body2">삭제</Typography>
      </Button>
    </Styled.Grid>
  );
}

export default NodeControlBar;
