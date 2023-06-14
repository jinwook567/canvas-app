import React, { useMemo } from 'react';
import { range } from 'ramda';
import { nodeFactory, Stage } from 'utils/editor/node';
import Asset from 'components/editor/Asset';
import PreviewStage from 'components/editor/PreviewStage';
import DivSize from 'components/common/DivSize';
import { Paper } from '@mui/material';

type Props = {
  addAsset: (asset: Stage) => void;
};

function TemplateAsset({ addAsset }: Props) {
  const texts = (n: number) =>
    range(0, n).map(num =>
      nodeFactory('text').map(() => ({
        text: 'hello world',
        fontSize: 20,
        x: 50 * num,
        y: 50 * num,
      }))
    );

  const templates = useMemo(
    () =>
      range(0, 3).map(num =>
        nodeFactory('stage')
          .map(() => ({ width: 500, height: 500 }))
          .addChild(...texts(num + 7))
      ),
    []
  );

  return (
    <Asset>
      <Asset.Mansory>
        {templates.map(stage => (
          <DivSize key={stage.id} inherit>
            {size => (
              <Paper elevation={2} onClick={() => addAsset(stage)}>
                <PreviewStage
                  stage={stage}
                  parentSize={{
                    width: size.width,
                    height: Math.max(size.width, size.height),
                  }}
                />
              </Paper>
            )}
          </DivSize>
        ))}
      </Asset.Mansory>
    </Asset>
  );
}

export default React.memo(TemplateAsset);
