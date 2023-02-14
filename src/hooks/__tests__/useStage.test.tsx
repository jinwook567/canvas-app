import { act } from '@testing-library/react';
import setupRenderUseEditorHook from '../../utils/setupRenderEditorHook';

function setupRenderUseStageHook() {
  const result = setupRenderUseEditorHook();
  const AppendStage = () => result.current.appendStage;
  const StageCount = () => result.current.stageCount;
  const CurrentStageIndex = () => result.current.currentStageIndex;
  const DeleteStage = () => result.current.deleteStage;
  const SelectStage = () => result.current.selectStage;

  return {
    result,
    AppendStage,
    StageCount,
    CurrentStageIndex,
    DeleteStage,
    SelectStage,
  };
}

test('Stage 추가', () => {
  const { AppendStage, StageCount, CurrentStageIndex } =
    setupRenderUseStageHook();

  act(() => AppendStage()(0));

  expect(StageCount()).toBe(2);
  expect(CurrentStageIndex()).toBe(1);

  act(() => AppendStage()(0));
  expect(StageCount()).toBe(3);
  expect(CurrentStageIndex()).toBe(1);

  act(() => AppendStage()(2));
  expect(StageCount()).toBe(4);
  expect(CurrentStageIndex()).toBe(3);

  expect(() => AppendStage()(4)).toThrow();
  expect(() => AppendStage()(-1)).toThrow();
});

test('Stage 삭제', () => {
  const { AppendStage, StageCount, CurrentStageIndex, DeleteStage } =
    setupRenderUseStageHook();

  act(() => DeleteStage()(0));

  expect(StageCount()).toBe(1);
  expect(CurrentStageIndex()).toBe(0);

  act(() => AppendStage()(0));
  act(() => AppendStage()(1));
  expect(StageCount()).toBe(3);

  act(() => DeleteStage()(2));
  expect(StageCount()).toBe(2);
  expect(CurrentStageIndex()).toBe(1);

  act(() => DeleteStage()(0));
  expect(StageCount()).toBe(1);
  expect(CurrentStageIndex()).toBe(0);

  expect(() => DeleteStage()(1)).toThrow();
  expect(() => DeleteStage()(-1)).toThrow();
});

test('Stage 선택', () => {
  const { AppendStage, CurrentStageIndex, SelectStage } =
    setupRenderUseStageHook();

  expect(() => SelectStage()(1)).toThrow();
  expect(() => SelectStage()(-1)).toThrow();

  act(() => AppendStage()(0));

  act(() => SelectStage()(0));
  expect(CurrentStageIndex()).toBe(0);

  act(() => SelectStage()(1));
  expect(CurrentStageIndex()).toBe(1);
});
