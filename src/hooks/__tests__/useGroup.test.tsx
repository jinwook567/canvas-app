import { act } from '@testing-library/react';
import setupRenderUseEditorHook from '../../utils/setupRenderEditorHook';

test('handleOrganizeGroup, handleCloseGroup', () => {
  const result = setupRenderUseEditorHook();
  const nodeArg = { url: '1', width: 100, height: 100, type: 'image' as const };

  act(() => result.current.appendAsset(nodeArg));
  act(() => result.current.appendAsset(nodeArg));
  act(() => result.current.appendAsset(nodeArg));

  const first = result.current.currentStage[0];
  const second = result.current.currentStage[1];
  const third = result.current.currentStage[2];

  act(() => result.current.selectShape({ id: second.id, type: 'append' }));
  act(() => result.current.selectShape({ id: third.id, type: 'append' }));

  act(() => result.current.organizeGroup(result.current.selectedIds));

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

  act(() => result.current.closeGroup(result.current.currentStage[1].id));
  expect(result.current.currentStage).toEqual([first, second, third]);

  act(() => result.current.selectShape({ id: second.id, type: 'append' }));
  act(() => result.current.selectShape({ id: third.id, type: 'append' }));
  expect(result.current.selectedIds).toEqual([second.id, third.id]);
  act(() => result.current.organizeGroup(result.current.selectedIds));

  act(() => result.current.selectShape({ id: first.id, type: 'append' }));
  act(() =>
    result.current.selectShape({
      id: result.current.currentStage[1].id,
      type: 'append',
    })
  );
  act(() => result.current.organizeGroup(result.current.selectedIds));

  expect(result.current.currentStage[0]).toEqual(
    expect.objectContaining({
      type: 'group',
      children: [
        first,
        expect.objectContaining({ type: 'group', children: [second, third] }),
      ],
    })
  );
});
