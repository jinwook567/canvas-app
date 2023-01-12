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

export default setupRenderUseEditorHook;
