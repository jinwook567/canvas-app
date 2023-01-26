import { act } from '@testing-library/react';
import setupRenderUseEditorHook from '../../utils/setupRenderEditorHook';

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
  act(() => result.current.appendStage(0));

  expect(result.current.selectedIds).toEqual([]);
});
