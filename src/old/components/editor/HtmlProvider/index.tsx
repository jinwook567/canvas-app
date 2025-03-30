import React from 'react';
import { Html } from 'react-konva-utils';

type Props = {
  children: React.ReactNode;
  show: boolean;
  html: React.ReactNode;
  pos: { x: number; y: number };
};

function HtmlProvider({ children, show, html, pos }: Props) {
  return (
    <>
      {show && (
        <Html
          divProps={{
            style: {
              top: `${pos.y - 3}px`,
              left: `${pos.x - 2}px`,
            },
          }}
        >
          {html}
        </Html>
      )}
      {children}
    </>
  );
}

export default HtmlProvider;
