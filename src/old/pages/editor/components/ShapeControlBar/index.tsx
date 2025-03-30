import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useGroup from 'old/hooks/editor/node/useGroup';
import useRemove from 'old/hooks/editor/node/useRemove';
import {
  selectedNodesState,
  selectedTabState,
  tabValue,
} from 'old/recoils/editor/atoms';
import { Group } from 'old/utils/editor/node';
import { Button, Grid, Typography } from '@mui/material';

function ShapeControlBar() {
  const { removeNodes } = useRemove();
  const { group, ungroup } = useGroup();
  const selectedNodes = useRecoilValue(selectedNodesState);
  const setSelectedTab = useSetRecoilState(selectedTabState);

  const canGroup = selectedNodes.length >= 2;
  const canRemove = selectedNodes.length >= 1;
  const canUnGroup =
    selectedNodes.length === 1 && selectedNodes[0].type === 'group';

  const buttons = [
    {
      name: '그룹화',
      onClick: canGroup ? () => group(selectedNodes) : null,
    },
    {
      name: '그룹해제',
      onClick: canUnGroup ? () => ungroup(selectedNodes[0] as Group) : null,
    },
    {
      name: '삭제',
      onClick: canRemove ? () => removeNodes(selectedNodes) : null,
    },
    {
      name: '위치',
      onClick: () => setSelectedTab(tabValue.handlerPosition),
    },
  ];

  return (
    <Grid columnGap={1} container>
      {buttons.map(({ name, onClick }, index) => (
        <ControlButton name={name} onClick={onClick} key={index} />
      ))}
    </Grid>
  );
}

function ControlButton({
  name,
  onClick,
}: {
  name: string;
  onClick: (() => void) | null;
}) {
  return (
    <Button
      variant="outlined"
      disabled={!onClick}
      onClick={() => onClick && onClick()}
    >
      <Typography variant="body2">{name}</Typography>
    </Button>
  );
}

export default ShapeControlBar;
