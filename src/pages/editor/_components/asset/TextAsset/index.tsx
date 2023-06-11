import React from 'react';
import { useRecoilValue } from 'recoil';
import useAdd from 'hooks/editor/node/useAdd';
import TextList from 'components/editor/TextList';
import { selectedStageState } from 'recoils/editor/atoms';
import { nodeFactory } from 'utils/editor/node';

function TextAsset() {
  const { addNodeToStage } = useAdd();
  const selectedStage = useRecoilValue(selectedStageState);

  return (
    <TextList
      items={[
        { fontSize: 30, text: '제목 추가하기' },
        { fontSize: 23, text: '부제목 추가하기' },
        { fontSize: 15, text: '본문 추가하기' },
        { fontSize: 11, text: '작은 텍스트 추가하기' },
      ]}
      onClick={textConfig =>
        selectedStage &&
        addNodeToStage(
          nodeFactory('text').map(() => textConfig),
          selectedStage
        )
      }
    />
  );
}

export default TextAsset;
