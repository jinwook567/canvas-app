import React from 'react';
import { range } from 'ramda';
import { useRecoilValue } from 'recoil';
import useTransform from '../../../../hooks/editor/stage/useTransform';
import { selectedStageClassValue } from '../../../../recoil/editor/selectors';
import TemplateList from '../../../../components/editor/TemplateList/TemplateList';
import { nodeFactory } from '../../../../utils/editor/node';

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
    nodeFactory('stage').addChild(...texts(num + 10))
  );
  const { applyTemplate } = useTransform();
  const selectedStage = useRecoilValue(selectedStageClassValue);

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
