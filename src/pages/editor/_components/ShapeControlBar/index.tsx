import React from 'react';
import { useRecoilValue } from 'recoil';
import useGroup from 'hooks/editor/node/useGroup';
import useRemove from 'hooks/editor/node/useRemove';
import { selectedNodesState } from 'recoils/editor/atoms';
import * as Styled from 'pages/editor/_components/ShapeControlBar/styles';
import ControlBar from 'components/editor/ShapeControlBar';
import { Group } from 'utils/editor/node';

function ShapeControlBar() {
  const { removeNodes } = useRemove();
  const { group, ungroup } = useGroup();
  const selectedNodes = useRecoilValue(selectedNodesState);

  return (
    <Styled.Grid padding={1} columnGap={1} container>
      <ControlBar
        onGroup={
          (selectedNodes.length >= 2 || undefined) &&
          (() => group(selectedNodes))
        }
        onRemove={
          (selectedNodes.length >= 1 || undefined) &&
          (() => removeNodes(selectedNodes))
        }
        onUnGroup={
          ((selectedNodes.length === 1 && selectedNodes[0].type === 'group') ||
            undefined) &&
          (() => ungroup(selectedNodes[0] as Group))
        }
      />
    </Styled.Grid>
  );
}

export default ShapeControlBar;