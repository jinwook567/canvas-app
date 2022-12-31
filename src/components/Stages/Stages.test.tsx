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
  expect(() => act(() => result.current.handleAppendStage(100))).toThrow();
  expect(() => act(() => result.current.handleDeleteStage(-1))).toThrow();
});

test('Stage 추가 테스트', () => {
  const { result } = setupRenderUseEditorHook();

  act(() => result.current.handleAppendStage(0));
  expect(result.current.stages).toEqual([[], []]);
  expect(result.current.stageIndex).toBe(1);

  act(() => result.current.handleAppendStage(1));
  expect(result.current.stages).toEqual([[], [], []]);
  expect(result.current.stageIndex).toBe(2);

  act(() => result.current.handleAppendStage(0));
  expect(result.current.stages).toEqual([[], [], [], []]);
  expect(result.current.stageIndex).toBe(1);
});

test('Stage 제거 테스트 예외 케이스', () => {
  const { result } = setupRenderUseEditorHook();

  act(() => result.current.handleDeleteStage(0));
  expect(result.current.stages).toEqual([[]]);
  expect(result.current.stageIndex).toBe(0);

  expect(() => act(() => result.current.handleDeleteStage(100))).toThrow();
  expect(() => act(() => result.current.handleDeleteStage(-1))).toThrow();
});

test('Stage 제거 테스트', () => {
  const { result } = setupRenderUseEditorHook();

  act(() => result.current.handleAppendStage(0));
  act(() => result.current.handleAppendStage(1));

  act(() => result.current.handleDeleteStage(2));
  expect(result.current.stageIndex).toBe(1);
  expect(result.current.stages).toEqual([[], []]);

  act(() => result.current.handleDeleteStage(1));
  expect(result.current.stageIndex).toBe(0);
  expect(result.current.stages).toEqual([[]]);
});

test('Stage 선택 테스트 예외 케이스', () => {
  const { result } = setupRenderUseEditorHook();
  expect(() => act(() => result.current.selectStage(100))).toThrow();
  expect(() => act(() => result.current.selectStage(-1))).toThrow();
});

test('Stage 선택 테스트', () => {
  const { result } = setupRenderUseEditorHook();

  act(() => result.current.handleAppendStage(0));
  act(() => result.current.handleAppendStage(1));

  expect(result.current.stageIndex).toBe(2);

  act(() => result.current.selectStage(1));
  expect(result.current.stageIndex).toBe(1);
});

export default {};
