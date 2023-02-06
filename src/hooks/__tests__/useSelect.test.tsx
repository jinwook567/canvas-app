import { act } from '@testing-library/react';
import setupRenderUseEditorHook from '../../utils/setupRenderEditorHook';

function setUpRenderUseSelectHook() {
  const result = setupRenderUseEditorHook();
  const SelectShape = () => result.current.selectShape;
  const Deselect = () => result.current.deselect;
  const SelectedIds = () => result.current.selectedIds;

  return { result, SelectShape, Deselect, SelectedIds };
}

test('select shape', () => {
  const { SelectShape, Deselect, SelectedIds } = setUpRenderUseSelectHook();

  act(() => SelectShape()({ id: '1', type: 'append' }));
  act(() => SelectShape()({ id: '2', type: 'append' }));
  act(() => SelectShape()({ id: '3', type: 'append' }));

  expect(SelectedIds()).toEqual(['1', '2', '3']);

  act(() => Deselect()());
  expect(SelectedIds()).toEqual([]);

  act(() => SelectShape()({ id: '1', type: 'append' }));
  act(() => SelectShape()({ id: '1', type: 'append' }));
  expect(SelectedIds()).toEqual(['1']);

  act(() => SelectShape()({ id: '2', type: 'change' }));
  expect(SelectedIds()).toEqual(['2']);
});

test('deselect shape', () => {
  const { result, SelectShape, Deselect, SelectedIds } =
    setUpRenderUseSelectHook();
  act(() => SelectShape()({ id: '1', type: 'append' }));
  act(() => SelectShape()({ id: '1', type: 'append' }));
  act(() => Deselect()());

  expect(SelectedIds()).toEqual([]);

  act(() => SelectShape()({ id: '1', type: 'append' }));
  act(() => SelectShape()({ id: '1', type: 'append' }));

  const AppendStage = () => result.current.appendStage;
  act(() => AppendStage()(0));

  expect(SelectedIds()).toEqual([]);
});
