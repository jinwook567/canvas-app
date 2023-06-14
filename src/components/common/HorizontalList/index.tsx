import React, { useEffect, useRef, useState } from 'react';
import { fromEvent } from 'rxjs';
import { LeftArrow, RightArrow } from 'components/common/HorizontalList/Arrow';
import * as Styled from './styles';

type Props = {
  children: React.ReactNode;
};

function HorizontalList({ children }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    if (!divRef.current) return () => {};

    const scroll$ = fromEvent<React.UIEvent<HTMLDivElement>>(
      divRef.current,
      'scroll'
    );

    setShowRightArrow(
      divRef.current && divRef.current.clientWidth < divRef.current.scrollWidth
    );

    const subscription = scroll$.subscribe(e => {
      const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const scroll = (x: number) => {
    if (!divRef.current) return;

    divRef.current.scrollBy({
      behavior: 'smooth',
      left: x,
    });
  };

  return (
    <Styled.Container>
      {showLeftArrow && (
        <Styled.LeftArrowPos>
          <LeftArrow
            onClick={() => scroll(-(divRef.current?.clientWidth || 100))}
          />
        </Styled.LeftArrowPos>
      )}
      <Styled.ScrollDiv ref={divRef} columnGap={2}>
        {children}
      </Styled.ScrollDiv>
      {showRightArrow && (
        <Styled.RightArrowPos>
          <RightArrow
            onClick={() => scroll(divRef.current?.clientWidth || 100)}
          />
        </Styled.RightArrowPos>
      )}
    </Styled.Container>
  );
}

export default HorizontalList;
