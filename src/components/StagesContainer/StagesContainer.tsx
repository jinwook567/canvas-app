import React, { useRef, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { stageSizeState } from '../../recoil/editor';
import * as Styled from './StagesContainer.styles';

type Props = {
  children: React.ReactNode;
};
function StagesContainer({ children }: Props) {
  const refContainer = useRef<HTMLDivElement>(null);
  const setStageSize = useSetRecoilState(stageSizeState);
  const time = 500;

  const timer = useRef<NodeJS.Timeout | null>(null);

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

  const handleResize = () => {
    if (!timer.current) {
      const size = getSize();
      if (size) setStageSize(size);

      const newTimer = setTimeout(() => {
        timer.current = null;
      }, time);
      timer.current = newTimer;
    }
  };

  window.addEventListener('resize', handleResize);

  return <Styled.Container ref={refContainer}>{children}</Styled.Container>;
}

export default StagesContainer;
