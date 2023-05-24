import React, { ReactElement } from 'react';
import { Stage, Layer } from 'react-konva';
import useElementResize from '../../../hooks/useElementSize';
import { getResizeScale } from '../../../utils/editor/scale';

export type Props = {
  width: number;
  height: number;
  shapes: ReactElement[];
};

function Preview({ width, height, shapes }: Props) {
  const { size, divRef } = useElementResize();

  const scale = getResizeScale(
    { width, height },
    { width: size.width, height: size.width },
    1
  );

  return (
    <div ref={divRef} style={{ width: '100%' }}>
      {!(size.width === 0 && size.height === 0) && (
        <Stage
          width={width * scale}
          height={height * scale}
          style={{ border: '1px solid black' }}
          scaleX={scale}
          scaleY={scale}
        >
          <Layer>{shapes.map(shape => shape)}</Layer>
        </Stage>
      )}
    </div>
  );
}

export default Preview;
