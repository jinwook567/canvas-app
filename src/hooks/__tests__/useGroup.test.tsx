import { act } from '@testing-library/react';
import { imageNodeArg } from '../../fixtures/editor';
import setupRenderUseEditorHook from '../../utils/setupRenderEditorHook';

function setUpRenderUseGroupHook() {
  const result = setupRenderUseEditorHook();
  return {
    AppendAsset: () => result.current.appendAsset,
    SelectShape: () => result.current.selectShape,
    OrganizeGroup: () => result.current.organizeGroup,
    CloseGroup: () => result.current.closeGroup,
    CreateNodeConfig: () => result.current.createNodeConfig,
    CurrentStage: () => result.current.currentStage,
    SelectedIds: () => result.current.selectedIds,
  };
}

test('그룹 생성 및 해제', () => {
  const {
    AppendAsset,
    SelectShape,
    OrganizeGroup,
    CloseGroup,
    CreateNodeConfig,
    CurrentStage,
    SelectedIds,
  } = setUpRenderUseGroupHook();

  act(() => AppendAsset()(CreateNodeConfig()(imageNodeArg)));
  act(() => AppendAsset()(CreateNodeConfig()(imageNodeArg)));
  act(() => AppendAsset()(CreateNodeConfig()(imageNodeArg)));

  const currentStageBeforeGrouping = CurrentStage();
  act(() => SelectShape()({ id: CurrentStage()[0].id, type: 'append' }));
  act(() => SelectShape()({ id: CurrentStage()[1].id, type: 'append' }));

  act(() => OrganizeGroup()(SelectedIds()));

  expect(CurrentStage()[0].type).toEqual('group');
  expect(CurrentStage()[0]).toEqual(
    expect.objectContaining({
      type: 'group',
      children: [currentStageBeforeGrouping[0], currentStageBeforeGrouping[1]],
    })
  );

  // 그룹 해제
  act(() => SelectShape()({ id: CurrentStage()[0].id, type: 'change' }));
  act(() => CloseGroup()(CurrentStage()[0].id));
  expect(CurrentStage()).toEqual(currentStageBeforeGrouping);
});
