import { act } from '@testing-library/react';
import { imageNodeArg } from '../../fixtures/editor';
import setupRenderUseEditorHook from '../../utils/setupRenderEditorHook';

function setupRenderHistoryHook() {
  const result = setupRenderUseEditorHook();
  const History = () => result.current.history;
  const AppendAsset = () => result.current.appendAsset;
  const CreateNodeConfig = () => result.current.createNodeConfig;
  const CurrentStage = () => result.current.currentStage;
  const OnTransformEnd = () => result.current.onTransformEnd;
  const HistoryBack = () => result.current.historyBack();
  const HistoryForward = () => result.current.historyForward();
  return {
    History,
    AppendAsset,
    CreateNodeConfig,
    CurrentStage,
    OnTransformEnd,
    HistoryBack,
    HistoryForward,
  };
}

test('히스토리 생성', () => {
  const {
    History,
    AppendAsset,
    CreateNodeConfig,
    OnTransformEnd,
    CurrentStage,
  } = setupRenderHistoryHook();

  act(() => AppendAsset()(CreateNodeConfig()(imageNodeArg)));
  expect(History().head?.stageList).toEqual([CurrentStage()]);

  act(() => OnTransformEnd()([{ id: CurrentStage()[0].id, x: 50, y: 50 }]));
  expect(History().head?.stageList).toEqual([CurrentStage()]);
});

test('히스토리 앞뒤로 이동', () => {
  const {
    AppendAsset,
    CreateNodeConfig,
    CurrentStage,
    HistoryBack,
    HistoryForward,
  } = setupRenderHistoryHook();

  const prevStage = CurrentStage();

  act(() => AppendAsset()(CreateNodeConfig()(imageNodeArg)));

  const nextStage = CurrentStage();

  act(() => HistoryBack());
  expect(CurrentStage()).toEqual(prevStage);

  act(() => HistoryForward());
  expect(CurrentStage()).toEqual(nextStage);
});
