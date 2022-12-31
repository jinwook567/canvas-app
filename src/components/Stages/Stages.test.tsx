import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { stagesState, workingStageIndexState } from '../../recoil/editor';
import { RecoilObserver } from '../../utils/test';
import useEditor from '../../hooks/useEditor';

// Stages 파트만 커스텀 훅으로 테스트한다.

function setupRenderUseEditorHook() {
  const onChangeStage = jest.fn();
  const onChangeStageIndex = jest.fn();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RecoilRoot>
      <RecoilObserver node={stagesState} onChange={onChangeStage} />
      <RecoilObserver
        node={workingStageIndexState}
        onChange={onChangeStageIndex}
      />
      {children}
    </RecoilRoot>
  );

  const { result } = renderHook(() => useEditor(), {
    wrapper,
  });

  return { onChangeStage, onChangeStageIndex, result };
}

test('Stage 추가 테스트', () => {
  const { result, onChangeStage, onChangeStageIndex } =
    setupRenderUseEditorHook();

  const { handleAppendStage } = result.current;

  expect(onChangeStage.mock.calls[0][0]).toEqual([[]]);
  expect(onChangeStageIndex.mock.calls[0][0]).toEqual(0);

  act(() => handleAppendStage(0));

  expect(onChangeStage.mock.calls[1][0]).toEqual([[], []]);
  expect(onChangeStageIndex.mock.calls[1][0]).toEqual(1);
});

export default {};
