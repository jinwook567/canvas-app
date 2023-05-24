import React from 'react';
import { useRecoilValue } from 'recoil';
import useAdd from '../../../../hooks/editor/node/useAdd';
import { selectedStageClassValue } from '../../../../recoil/editor/selectors';
import { Text } from '../../../../utils/editor/shapes';
import TextList from '../../../../components/editor/TextList/TextList';

function TextAsset() {
  const { addShapeToStage } = useAdd();
  const selectedStage = useRecoilValue(selectedStageClassValue);

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
        addShapeToStage(new Text({ ...textConfig }), selectedStage.id)
      }
    />
  );
}

export default TextAsset;
