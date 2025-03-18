import { css } from '@emotion/react';
import React, { useEffect, useRef } from 'react';

type Props = {
  shouldFocus?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

function Frame({ shouldFocus, children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldFocus && ref.current) {
      ref.current.focus();
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [shouldFocus]);

  return (
    <div
      ref={ref}
      {...rest}
      css={css`
        width: fit-content;
      `}
    >
      {children}
    </div>
  );
}

export default Frame;
