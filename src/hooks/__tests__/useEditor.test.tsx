import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import useEditor from '../useEditor';

function setupRenderUseEditorHook() {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RecoilRoot>{children}</RecoilRoot>
  );

  const { result } = renderHook(() => useEditor(), {
    wrapper,
  });

  act(() => {
    result.current.setStageSize({ width: 1000, height: 1000 });
  });

  return result;
}

test('handleAppendStage', () => {
  const result = setupRenderUseEditorHook();

  act(() => result.current.handleAppendStage(0));
  expect(result.current.stages).toEqual([[], []]);
  expect(result.current.currentStageIndex).toBe(1);

  act(() => result.current.handleAppendStage(0));
  expect(result.current.stages).toEqual([[], [], []]);
  expect(result.current.currentStageIndex).toBe(1);

  act(() => result.current.handleAppendStage(2));
  expect(result.current.stages).toEqual([[], [], [], []]);
  expect(result.current.currentStageIndex).toBe(3);

  expect(() => result.current.handleAppendStage(4)).toThrow();
  expect(() => result.current.handleAppendStage(-1)).toThrow();
});

test('handleDeleteStage', () => {
  const result = setupRenderUseEditorHook();

  act(() => result.current.handleDeleteStage(0));
  expect(result.current.stages).toEqual([[]]);
  expect(result.current.currentStageIndex).toBe(0);

  act(() => result.current.handleAppendStage(0));
  act(() => result.current.handleAppendStage(1));

  act(() => result.current.handleDeleteStage(2));
  expect(result.current.stages).toEqual([[], []]);
  expect(result.current.currentStageIndex).toBe(1);

  act(() => result.current.handleDeleteStage(0));
  expect(result.current.stages).toEqual([[]]);
  expect(result.current.currentStageIndex).toBe(0);

  expect(() => result.current.handleDeleteStage(1)).toThrow();
  expect(() => result.current.handleDeleteStage(-1)).toThrow();
});

test('select Stage function', () => {
  const result = setupRenderUseEditorHook();

  expect(() => result.current.selectStage(1)).toThrow();
  expect(() => result.current.selectStage(-1)).toThrow();

  act(() => result.current.handleAppendStage(0));

  act(() => result.current.selectStage(0));
  act(() => result.current.selectStage(1));

  expect(result.current.currentStageIndex).toBe(1);

  act(() => result.current.selectStage(0));
  expect(result.current.currentStageIndex).toBe(0);
});

test('select shape', () => {
  const result = setupRenderUseEditorHook();

  act(() => result.current.selectShape({ id: '1', type: 'append' }));
  act(() => result.current.selectShape({ id: '2', type: 'append' }));
  act(() => result.current.selectShape({ id: '3', type: 'append' }));

  expect(result.current.selectedIds).toEqual(['1', '2', '3']);

  act(() => result.current.deselect());
  expect(result.current.selectedIds).toEqual([]);

  act(() => result.current.selectShape({ id: '1', type: 'append' }));
  act(() => result.current.selectShape({ id: '1', type: 'append' }));
  expect(result.current.selectedIds).toEqual(['1']);

  act(() => result.current.selectShape({ id: '2', type: 'change' }));
  expect(result.current.selectedIds).toEqual(['2']);
});

test('deselect shape', () => {
  const result = setupRenderUseEditorHook();
  act(() => result.current.selectShape({ id: '1', type: 'append' }));
  act(() => result.current.selectShape({ id: '1', type: 'append' }));
  act(() => result.current.deselect());

  expect(result.current.selectedIds).toEqual([]);

  act(() => result.current.selectShape({ id: '1', type: 'append' }));
  act(() => result.current.selectShape({ id: '1', type: 'append' }));
  act(() => result.current.handleAppendStage(0));

  expect(result.current.selectedIds).toEqual([]);
});

test('handleTransformNodes', () => {
  const result = setupRenderUseEditorHook();

  act(() =>
    result.current.handleAppendAsset({
      url: '1',
      width: 300,
      height: 300,
      type: 'image',
    })
  );
  act(() =>
    result.current.handleAppendAsset({
      url: '1',
      width: 300,
      height: 300,
      type: 'image',
    })
  );

  const transformedNodes = result.current.currentStage.map(node => ({
    id: node.id,
    scaleX: node.scaleX * 1.5,
    scaleY: node.scaleY * 1.5,
    x: node.x + 100,
    y: node.y + 200,
  }));

  act(() => result.current.handleTransformNodes(transformedNodes));
  expect(result.current.currentStage).toEqual(
    transformedNodes.map(node => ({
      ...node,
      type: 'image',
      url: '1',
      width: 300,
      height: 300,
    }))
  );
});

test('handleOrganizeGroup, handleCloseGroup', () => {
  const result = setupRenderUseEditorHook();
  const nodeArg = { url: '1', width: 100, height: 100, type: 'image' as const };

  act(() => result.current.handleAppendAsset(nodeArg));
  act(() => result.current.handleAppendAsset(nodeArg));
  act(() => result.current.handleAppendAsset(nodeArg));

  const first = result.current.currentStage[0];
  const second = result.current.currentStage[1];
  const third = result.current.currentStage[2];

  act(() => result.current.selectShape({ id: second.id, type: 'append' }));
  act(() => result.current.selectShape({ id: third.id, type: 'append' }));

  act(() => result.current.handleOrganizeGroup(result.current.selectedIds));

  expect(result.current.currentStage[0]).toEqual(first);
  expect(result.current.currentStage[1]).toEqual(
    expect.objectContaining({
      type: 'group',
      scaleX: 1,
      scaleY: 1,
      children: [second, third],
      x: 0,
      y: 0,
    })
  );

  act(() => result.current.handleCloseGroup(result.current.currentStage[1].id));
  expect(result.current.currentStage[1]).toEqual(second);
  expect(result.current.currentStage[2]).toEqual(third);
});
