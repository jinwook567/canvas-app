import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import useEditor from '../hooks/useEditor';

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

function setupRenderHook() {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RecoilRoot>{children}</RecoilRoot>
  );

  const { result } = renderHook(() => useEditor(), {
    wrapper,
  });

  act(() => {
    result.current.setStageSize({ width: 1000, height: 1000 });
  });

  return {
    AppendAsset: () => result.current.appendAsset,
    SelectShape: () => result.current.selectShape,
    OrganizeGroup: () => result.current.organizeGroup,
    CloseGroup: () => result.current.closeGroup,
    CreateNodeConfig: () => result.current.createNodeConfig,
    OnTransformEnd: () => result.current.onTransformEnd,
    CurrentStage: () => result.current.currentStage,
    StageCount: () => result.current.stageCount,
    CurrentStageIndex: () => result.current.currentStageIndex,
    DeleteStage: () => result.current.deleteStage,
    SelectStage: () => result.current.selectStage,
    Deselect: () => result.current.deselect,
    SelectedIds: () => result.current.selectedIds,
  };
}

export default setupRenderUseEditorHook;
