import { Grid } from '@mui/material';
import DivSize from 'components/common/DivSize';
import Asset from 'components/editor/Asset';
import PreviewShape from 'components/editor/PreviewShape';
import React, { useMemo } from 'react';
import { nodeFactory, Rect, Shape } from 'utils/editor/node';

type Props = {
  addAsset: (shape: Shape) => void;
};

function FigureAsset({ addAsset }: Props) {
  const colors = ['#6869d6', '#E2E2E2'];
  const circles = useMemo(
    () =>
      colors.map(fill =>
        nodeFactory('circle').map(() => ({
          fill,
          width: 250,
          height: 250,
          x: 125,
          y: 125,
        }))
      ),
    []
  );

  const squares = useMemo(
    () =>
      colors.map(fill =>
        nodeFactory('rect').map(() => ({
          fill,
          width: 250,
          height: 250,
        }))
      ),
    []
  );

  return (
    <Asset>
      <Asset.Mansory>
        {[...circles, ...squares].map(figure => (
          <DivSize key={figure.id} inherit>
            {size => (
              <Grid
                onClick={() =>
                  addAsset(
                    (figure instanceof Rect
                      ? nodeFactory('rect')
                      : nodeFactory('circle')
                    ).map(() => figure.config)
                  )
                }
              >
                <PreviewShape
                  shape={figure}
                  parentSize={{
                    width: size.width,
                    height: Math.max(size.width, size.height),
                  }}
                />
              </Grid>
            )}
          </DivSize>
        ))}
      </Asset.Mansory>
    </Asset>
  );
}

export default React.memo(FigureAsset);
