import React from 'react';
import { useRecoilValue } from 'recoil';
import { templateSample } from '../../../../fixtures/editor';
import useTransform from '../../../../hooks/editor/stage/useTransform';
import { selectedStageValue } from '../../../../recoil/editor/selectors';
import TemplateList from '../../../common/editor/TemplateList/TemplateList';

function TemplateAsset() {
  const { transformSelectedStageByTemplate } = useTransform();
  const selectedStage = useRecoilValue(selectedStageValue);
  return (
    <TemplateList
      items={[templateSample, templateSample, templateSample]}
      onClick={template =>
        selectedStage &&
        transformSelectedStageByTemplate(template, selectedStage)
      }
    />
  );
}

export default TemplateAsset;
