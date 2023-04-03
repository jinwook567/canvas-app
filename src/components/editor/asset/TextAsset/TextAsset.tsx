import React from 'react';
import { useRecoilValue } from 'recoil';
import useCreate from '../../../../hooks/editor/node/useCreate';
import { selectedStageValue } from '../../../../recoil/editor/selectors';
import TextList from '../../../common/editor/TextList/TextList';

function TextAsset() {
  const { createNode } = useCreate();
  const selectedStage = useRecoilValue(selectedStageValue);
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
        createNode({ type: 'text', config: textConfig }, selectedStage)
      }
    />
  );
}

export default TextAsset;
