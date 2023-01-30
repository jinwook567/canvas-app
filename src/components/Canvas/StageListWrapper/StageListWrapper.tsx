import React from 'react';
import { useSetRecoilState } from 'recoil';
import { stageSizeState } from '../../../recoil/editor';
import useStageSize from '../useStageSize';
import * as Styled from './StageListWrapper.styles';

type Props = {
  children: React.ReactNode;
};

function StageListWrapper({ children }: Props) {
  const setStageSize = useSetRecoilState(stageSizeState);
  const canvasDivRef = useStageSize({
    setStageSize: size =>
      setStageSize({ width: size.width / 2, height: size.height / 2 }),
  });

  return (
    <Styled.Wrapper ref={canvasDivRef} rowGap={3}>
      {children}
    </Styled.Wrapper>
  );
}

export default StageListWrapper;
