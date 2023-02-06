import { act } from '@testing-library/react';
import { imageNodeArg } from '../../fixtures/editor';
import setupRenderUseEditorHook from '../../utils/setupRenderEditorHook';

test('history', () => {
  const result = setupRenderUseEditorHook();

  const History = () => result.current.history;
  expect(History()).toEqual([[[]]]);

  const AppendAsset = () => result.current.appendAsset;
  const CreateNodeConfig = () => result.current.createNodeConfig;

  act(() => AppendAsset()(CreateNodeConfig()(imageNodeArg)));

  const CurrentStage = () => result.current.currentStage;
  const firstStage = CurrentStage();
  expect(History()).toEqual([[[]], [firstStage]]);

  const historyStages = [firstStage];

  const OnTransformEnd = () => result.current.onTransformEnd;

  for (let i = 0; i < 3; i += 1) {
    const targetNode = CurrentStage()[0];
    act(() =>
      OnTransformEnd()([
        {
          id: targetNode.id,
          x: targetNode.x + 50,
          y: targetNode.y + 50,
        },
      ])
    );
    historyStages.push(CurrentStage());
  }

  const secondStage = historyStages[1];
  const thirdStage = historyStages[2];
  const fourthStage = historyStages[3];

  expect(History()).toEqual([
    [[]],
    [firstStage],
    [secondStage],
    [thirdStage],
    [fourthStage],
  ]);

  const HistoryBack = () => result.current.historyBack();
  const HistoryForward = () => result.current.historyForward();

  expect(CurrentStage()).toEqual(fourthStage);

  act(() => HistoryBack());
  expect(CurrentStage()).toEqual(thirdStage);

  act(() => HistoryBack());
  act(() => HistoryBack());
  expect(CurrentStage()).toEqual(firstStage);

  act(() => HistoryBack());
  expect(CurrentStage()).toEqual([]);

  act(() => HistoryBack());
  expect(CurrentStage()).toEqual([]);

  act(() => HistoryForward());
  expect(CurrentStage()).toEqual(firstStage);

  act(() => HistoryForward());
  act(() => HistoryForward());
  act(() => HistoryForward());
  act(() => HistoryForward());
  act(() => HistoryForward());
  expect(CurrentStage()).toEqual(fourthStage);

  act(() => HistoryBack());
  act(() => HistoryBack());

  const targetNode = CurrentStage()[0];
  act(() =>
    OnTransformEnd()([
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

  expect(History()).toEqual([
    [[]],
    [firstStage],
    [secondStage],
    [newThirdStage],
  ]);
});
