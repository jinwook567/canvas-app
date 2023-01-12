import { act } from '@testing-library/react';
import setupRenderUseEditorHook from '../../utils/setupRenderEditorHook';

test('handleTransformNodes', () => {
  const result = setupRenderUseEditorHook();

  act(() =>
    result.current.appendAsset({
      url: '1',
      width: 300,
      height: 300,
      type: 'image',
    })
  );
  act(() =>
    result.current.appendAsset({
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

  act(() => result.current.onTransformEnd(transformedNodes));
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
