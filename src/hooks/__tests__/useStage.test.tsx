import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import useStage from '../useStage';

function setUpRenderStageHook() {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RecoilRoot>{children}</RecoilRoot>
  );

  const { result } = renderHook(useStage, {
    wrapper,
  });

  return result;
}

test('handleAppendStage', () => {
  const result = setUpRenderStageHook();

  act(() => result.current.appendStage(0));
  expect(result.current.stageCount).toBe(2);
  expect(result.current.currentStageIndex).toBe(1);

  act(() => result.current.appendStage(0));
  expect(result.current.stageCount).toBe(3);
  expect(result.current.currentStageIndex).toBe(1);

  act(() => result.current.appendStage(2));
  expect(result.current.stageCount).toBe(4);
  expect(result.current.currentStageIndex).toBe(3);

  expect(() => result.current.appendStage(4)).toThrow();
  expect(() => result.current.appendStage(-1)).toThrow();
});

test('handleDeleteStage', () => {
  const result = setUpRenderStageHook();

  act(() => result.current.deleteStage(0));
  expect(result.current.stageCount).toBe(1);
  expect(result.current.currentStageIndex).toBe(0);

  act(() => result.current.appendStage(0));
  act(() => result.current.appendStage(1));

  act(() => result.current.deleteStage(2));
  expect(result.current.stageCount).toBe(2);
  expect(result.current.currentStageIndex).toBe(1);

  act(() => result.current.deleteStage(0));
  expect(result.current.stageCount).toBe(1);
  expect(result.current.currentStageIndex).toBe(0);

  expect(() => result.current.deleteStage(1)).toThrow();
  expect(() => result.current.deleteStage(-1)).toThrow();
});

test('select Stage function', () => {
  const result = setUpRenderStageHook();

  expect(() => result.current.selectStage(1)).toThrow();
  expect(() => result.current.selectStage(-1)).toThrow();

  act(() => result.current.appendStage(0));

  act(() => result.current.selectStage(0));
  act(() => result.current.selectStage(1));

  expect(result.current.currentStageIndex).toBe(1);

  act(() => result.current.selectStage(0));
  expect(result.current.currentStageIndex).toBe(0);
});
