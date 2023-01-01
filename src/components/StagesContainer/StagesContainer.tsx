import React, { useRef, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { stageSizeState } from '../../recoil/editor';
import * as Style from './StagesContainer.styles';

type Props = {
  children: React.ReactNode;
};
function StagesContainer({ children }: Props) {
  const refContainer = useRef<HTMLDivElement>(null);
  const setStageSize = useSetRecoilState(stageSizeState);

  const getSize = () =>
    refContainer.current
      ? {
          width: refContainer.current.offsetWidth,
          height: refContainer.current.offsetHeight,
        }
      : null;

  useEffect(() => {
    const size = getSize();
    if (size) setStageSize(size);
  }, []);

  window.addEventListener('resize', () => {
    const size = getSize();
    if (size) setStageSize(size);
  });

  return <Style.Container ref={refContainer}>{children}</Style.Container>;
}

export default StagesContainer;
