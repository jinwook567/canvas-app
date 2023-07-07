import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useGroup from 'hooks/editor/node/useGroup';
import useRemove from 'hooks/editor/node/useRemove';
import {
  selectedNodesState,
  selectedTabState,
  tabValue,
} from 'recoils/editor/atoms';
import { Group } from 'utils/editor/node';
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
  const canLocate = selectedNodes.length >= 1;

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
      onClick: canLocate
        ? () => setSelectedTab(tabValue.handlerPosition)
        : null,
    },
  ];

  return (
    <Grid
      padding={1}
      columnGap={1}
      container
      sx={{
        background: 'white',
        width: 1,
        position: 'sticky',
        top: 0,
        zIndex: 999,
      }}
    >
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
