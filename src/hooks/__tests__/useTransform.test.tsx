import { act } from '@testing-library/react';
import { imageNodeArg } from '../../fixtures/editor';
import setupRenderUseEditorHook from '../../utils/setupRenderEditorHook';

function setupRenderUseTransformHook() {
  const result = setupRenderUseEditorHook();
  return {
    AppendAsset: () => result.current.appendAsset,
    OnTransformEnd: () => result.current.onTransformEnd,
    CurrentStage: () => result.current.currentStage,
    CreateNodeConfig: () => result.current.createNodeConfig,
  };
}

test('Transform', () => {
  const { AppendAsset, OnTransformEnd, CurrentStage, CreateNodeConfig } =
    setupRenderUseTransformHook();

  act(() => AppendAsset()(CreateNodeConfig()(imageNodeArg)));
  act(() => AppendAsset()(CreateNodeConfig()(imageNodeArg)));

  const transformed = CurrentStage().map(node => ({
    ...node,
    x: node.x + 100,
  }));

  act(() => OnTransformEnd()(transformed));
  expect(CurrentStage()).toEqual(transformed);
});

// TODO: 만일 변형이 요청된 노드가 현재 stage에 없다면 오류를 발생시켜야함.
