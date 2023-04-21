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

function NodeControlBar() {
  const { removeNodes } = useRemove();
  const { group, ungroup } = useGroup();
  const selectedIds = useRecoilValue(selectedIdsState);
  const stages = useRecoilValue(stageClassesState);

  const selectedShapeNodes = _.chain(stages)
    .flatMap(stage => stage.children)
    .filter(shape => selectedIds.includes(shape.id))
    .map(shape => shape.node)
    .compact()
    .value();

  const shapeStage = selectedShapeNodes[0]?.getStage();

  return (
    <Styled.Grid padding={1} columnGap={1} container>
      <Button
        variant="outlined"
        disabled={
          selectedShapeNodes.length < 2 ||
          !selectedShapeNodes.every(
            node => node.getStage() === selectedShapeNodes[0].getStage()
          )
        }
        onClick={() => shapeStage && group(selectedIds, shapeStage.id())}
      >
        <Typography variant="body2">그룹화</Typography>
      </Button>
      <Button
        variant="outlined"
        disabled={
          selectedShapeNodes.length !== 1 ||
          selectedShapeNodes[0].getType() !== 'group'
        }
        onClick={() => shapeStage && ungroup(selectedIds[0], shapeStage.id())}
      >
        <Typography variant="body2">그룹 해제</Typography>
      </Button>
      <Button
        variant="outlined"
        disabled={selectedIds.length === 0}
        onClick={() => shapeStage && removeNodes(selectedIds, shapeStage.id())}
      >
        <Typography variant="body2">삭제</Typography>
      </Button>
    </Styled.Grid>
  );
}

export default NodeControlBar;
