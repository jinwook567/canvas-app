import { act } from '@testing-library/react';
import setupRenderUseEditorHook from '../../utils/setupRenderEditorHook';

test('history', () => {
  const result = setupRenderUseEditorHook();

  expect(result.current.history).toEqual([[[]]]);

  act(() =>
    result.current.appendAsset({
      type: 'image',
      url: '1',
      width: 300,
      height: 300,
    })
  );

  const firstStage = result.current.currentStage;
  expect(result.current.history).toEqual([[[]], [firstStage]]);

  for (let i = 0; i < 3; i += 1) {
    const targetNode = result.current.currentStage[0];
    act(() =>
      result.current.onTransformEnd([
        {
          id: targetNode.id,
          x: targetNode.x + 50,
          y: targetNode.y + 50,
        },
      ])
    );
  }

  const secondStage = [
    { ...firstStage[0], x: firstStage[0].x + 50, y: firstStage[0].y + 50 },
  ];
  const thirdStage = [
    { ...secondStage[0], x: secondStage[0].x + 50, y: secondStage[0].y + 50 },
  ];
  const fourthStage = [
    { ...thirdStage[0], x: thirdStage[0].x + 50, y: thirdStage[0].y + 50 },
  ];

  expect(result.current.history).toEqual([
    [[]],
    [firstStage],
    [secondStage],
    [thirdStage],
    [fourthStage],
  ]);

  act(() => result.current.historyBack());
  expect(result.current.currentStage).toEqual(thirdStage);

  act(() => result.current.historyBack());
  act(() => result.current.historyBack());
  expect(result.current.currentStage).toEqual(firstStage);

  act(() => result.current.historyForward());
  expect(result.current.currentStage).toEqual(secondStage);

  const targetNode = result.current.currentStage[0];
  act(() =>
    result.current.onTransformEnd([
      {
        id: targetNode.id,
        x: targetNode.x + 300,
        y: targetNode.y + 300,
      },
    ])
  );
  const newThirdStage = [
    { ...secondStage[0], x: secondStage[0].x + 300, y: secondStage[0].y + 300 },
  ];

  expect(result.current.history).toEqual([
    [[]],
    [firstStage],
    [secondStage],
    [newThirdStage],
  ]);
});
