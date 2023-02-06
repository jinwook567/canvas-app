import { act } from '@testing-library/react';
import { imageNodeArg } from '../../fixtures/editor';
import setupRenderUseEditorHook from '../../utils/setupRenderEditorHook';
import { omit } from '../../utils/unit';

function setupRenderUseAssetHook() {
  const result = setupRenderUseEditorHook();
  const CurrentStage = () => result.current.currentStage;

  const { appendAsset, createNodeConfig } = result.current;
  const actAppendImageAsset = () =>
    act(() => appendAsset(createNodeConfig(imageNodeArg)));

  return { result, CurrentStage, actAppendImageAsset };
}

test('append Asset', () => {
  const { CurrentStage, actAppendImageAsset } = setupRenderUseAssetHook();

  actAppendImageAsset();
  expect(CurrentStage().length).toBe(1);
  expect(CurrentStage()[0]).toEqual(
    expect.objectContaining(omit(imageNodeArg, 'width', 'height'))
  );

  actAppendImageAsset();
  expect(CurrentStage().length).toBe(2);
  expect(CurrentStage()[1]).toEqual(
    expect.objectContaining(omit(imageNodeArg, 'width', 'height'))
  );
  expect(CurrentStage()[1].x).toBeGreaterThan(CurrentStage()[0].x);
  expect(CurrentStage()[1].y).toBeGreaterThan(CurrentStage()[0].y);
});

test('delete Asset', () => {
  const { result, CurrentStage, actAppendImageAsset } =
    setupRenderUseAssetHook();

  actAppendImageAsset();
  actAppendImageAsset();
  actAppendImageAsset();

  const firstImage = CurrentStage()[0];
  const secondImage = CurrentStage()[1];
  const thirdImage = CurrentStage()[2];

  const { selectShape } = result.current;
  act(() => selectShape({ id: firstImage.id, type: 'change' }));

  const { deleteAsset } = result.current;
  const SelectedIds = () => result.current.selectedIds;
  act(() => deleteAsset(SelectedIds()));

  expect(CurrentStage()).toEqual([secondImage, thirdImage]);

  act(() => selectShape({ id: secondImage.id, type: 'append' }));
  act(() => selectShape({ id: thirdImage.id, type: 'append' }));
  act(() => deleteAsset(SelectedIds()));

  expect(CurrentStage()).toEqual([]);
});
