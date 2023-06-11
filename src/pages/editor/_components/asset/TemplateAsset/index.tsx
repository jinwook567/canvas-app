import React from 'react';
import { range } from 'ramda';
import { useRecoilValue } from 'recoil';
import useTransform from 'hooks/editor/stage/useTransform';
import { selectedStageState } from 'recoils/editor/atoms';
import TemplateList from 'components/editor/TemplateList';
import { nodeFactory } from 'utils/editor/node';

function TemplateAsset() {
  const texts = (n: number) =>
    range(0, n).map(num =>
      nodeFactory('text').map(() => ({
        text: 'hello world',
        fontSize: 20,
        x: 50 * num,
        y: 50 * num,
      }))
    );

  const templates = range(0, 3).map(num =>
    nodeFactory('stage')
      .map(() => ({ width: 500, height: 500 }))
      .addChild(...texts(num + 7))
  );
  const { applyTemplate } = useTransform();
  const selectedStage = useRecoilValue(selectedStageState);

  return (
    <TemplateList
      items={templates}
      onClick={template =>
        selectedStage && applyTemplate(template, selectedStage)
      }
    />
  );
}

export default TemplateAsset;
