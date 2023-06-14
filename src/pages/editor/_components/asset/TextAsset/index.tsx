import React from 'react';
import TextList from 'components/editor/TextList';
import { nodeFactory, Text } from 'utils/editor/node';

type Props = {
  addAsset: (asset: Text) => void;
};

function TextAsset({ addAsset }: Props) {
  return (
    <TextList
      items={[
        { fontSize: 30, text: '제목 추가하기' },
        { fontSize: 23, text: '부제목 추가하기' },
        { fontSize: 15, text: '본문 추가하기' },
        { fontSize: 11, text: '작은 텍스트 추가하기' },
      ]}
      onClick={textConfig =>
        addAsset(nodeFactory('text').map(() => textConfig))
      }
    />
  );
}

export default TextAsset;
