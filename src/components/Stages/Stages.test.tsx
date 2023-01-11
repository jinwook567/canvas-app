import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import useEditor from '../../hooks/useEditor';

// Stages 파트만 커스텀 훅으로 테스트한다.

function setupRenderUseEditorHook() {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RecoilRoot>{children}</RecoilRoot>
  );

  return renderHook(() => useEditor(), {
    wrapper,
  });
}

test('Stage 추가 예외 테스트', () => {
  const { result } = setupRenderUseEditorHook();
  expect(() => act(() => result.current.appendStage(100))).toThrow();
  expect(() => act(() => result.current.appendStage(-1))).toThrow();
});

test('Stage 추가 테스트', () => {
  const { result } = setupRenderUseEditorHook();

  act(() => result.current.appendStage(0));
  expect(result.current.stages).toEqual([[], []]);
  expect(result.current.currentStageIndex).toBe(1);

  act(() => result.current.appendStage(1));
  expect(result.current.stages).toEqual([[], [], []]);
  expect(result.current.currentStageIndex).toBe(2);

  act(() => result.current.appendStage(0));
  expect(result.current.stages).toEqual([[], [], [], []]);
  expect(result.current.currentStageIndex).toBe(1);
});

test('Stage 제거 테스트 예외 케이스', () => {
  const { result } = setupRenderUseEditorHook();

  act(() => result.current.deleteStage(0));
  expect(result.current.stages).toEqual([[]]);
  expect(result.current.currentStageIndex).toBe(0);

  expect(() => act(() => result.current.deleteStage(100))).toThrow();

  expect(() => act(() => result.current.appendStage(0)));
  expect(() => act(() => result.current.deleteStage(2))).toThrow();
});

test('Stage 제거 테스트', () => {
  const { result } = setupRenderUseEditorHook();

  act(() => result.current.appendStage(0));
  act(() => result.current.appendStage(1));

  act(() => result.current.deleteStage(2));
  expect(result.current.currentStageIndex).toBe(1);
  expect(result.current.stages).toEqual([[], []]);

  act(() => result.current.deleteStage(1));
  expect(result.current.currentStageIndex).toBe(0);
  expect(result.current.stages).toEqual([[]]);
});

test('Stage 선택 테스트 예외 케이스', () => {
  const { result } = setupRenderUseEditorHook();
  expect(() => act(() => result.current.selectStage(100))).toThrow();
  expect(() => act(() => result.current.selectStage(-1))).toThrow();
});

test('Stage 선택 테스트', () => {
  const { result } = setupRenderUseEditorHook();

  act(() => result.current.appendStage(0));
  act(() => result.current.appendStage(1));

  expect(result.current.currentStageIndex).toBe(2);

  act(() => result.current.selectStage(1));
  expect(result.current.currentStageIndex).toBe(1);
});

export default {};
