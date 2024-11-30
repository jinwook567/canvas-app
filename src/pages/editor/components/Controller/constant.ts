import { Props } from 'pages/editor/components/AssetList';
import { range } from 'ramda';
import { nodeFactory } from 'utils/editor/node';

export const imageAsset: Props['assets'] = [
  {
    type: 'mansory',
    nodes: ['yoda.jpg', 'lion.png'].map(
      pic => `/${pic}`
    ),
  },
];

export const figureAsset: Props['assets'] = [
  {
    type: 'mansory',
    nodes: [
      ...['#6869d6', '#E2E2E2'].map(color =>
        nodeFactory('rect').map(() => ({
          fill: color,
          width: 250,
          height: 250,
        }))
      ),
    ],
  },
];

const texts = (n: number) =>
  range(0, n).map(num =>
    nodeFactory('text').map(() => ({
      text: 'hello world',
      fontSize: 20,
      x: 50 * num,
      y: 50 * num,
    }))
  );

export const templateAsset: Props['assets'] = [
  {
    type: 'mansory',
    nodes: range(0, 3).map(num =>
      nodeFactory('stage')
        .map(() => ({ width: 500, height: 500 }))
        .addChild(...texts(num + 7))
    ),
  },
];

export const textAsset: Props['assets'] = [
  {
    type: 'vertical',
    nodes: [
      { fontSize: 30, text: '제목 추가하기' },
      { fontSize: 23, text: '부제목 추가하기' },
      { fontSize: 15, text: '본문 추가하기' },
      { fontSize: 11, text: '작은 텍스트 추가하기' },
    ].map(data => nodeFactory('text').map(() => data)),
  },
];
