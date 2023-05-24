import React from 'react';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';
import useTransform from '../../../../hooks/editor/stage/useTransform';
import { selectedStageClassValue } from '../../../../recoil/editor/selectors';
import { Stage, Text } from '../../../../utils/editor/shapes';
import TemplateList from '../../../../components/editor/TemplateList/TemplateList';

function TemplateAsset() {
  const templateSample = new Stage({ width: 500, height: 500 }).setChildren(
    _.range(10).map(
      num =>
        new Text({
          text: 'hello world',
          fontSize: 20,
          x: 50 * num,
          y: 50 * num,
        })
    )
  );

  const { applyTemplate } = useTransform();
  const selectedStage = useRecoilValue(selectedStageClassValue);

  return (
    <TemplateList
      items={[templateSample, templateSample, templateSample]}
      onClick={template =>
        selectedStage && applyTemplate(template, selectedStage)
      }
    />
  );
}

export default TemplateAsset;
