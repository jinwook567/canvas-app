import { Button, Typography } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import useDelete from '../../../hooks/editor/Node/useDelete';
import useGroup from '../../../hooks/editor/Node/useGroup';
import { selectedIdsState } from '../../../recoil/editor/atoms';
import * as Styled from './NodeControlBar.styles';

function NodeControlBar() {
  const { group, canGroup, ungroup, canUnGroup } = useGroup();
  const { deleteNodes, canDeleteNode } = useDelete();
  const selectedIds = useRecoilValue(selectedIdsState);

  return (
    <Styled.Grid padding={1} columnGap={1} container>
      <Button
        variant="outlined"
        disabled={!canGroup(selectedIds)}
        onClick={() => group(selectedIds)}
      >
        <Typography variant="body2">그룹화</Typography>
      </Button>
      <Button
        variant="outlined"
        disabled={!canUnGroup(selectedIds[0])}
        onClick={() => ungroup(selectedIds[0])}
      >
        <Typography variant="body2">그룹 해제</Typography>
      </Button>
      <Button
        variant="outlined"
        disabled={!canDeleteNode(selectedIds)}
        onClick={() => deleteNodes(selectedIds)}
      >
        <Typography variant="body2">삭제</Typography>
      </Button>
    </Styled.Grid>
  );
}

export default NodeControlBar;
