import React from 'react';
import { templateSample } from '../../../../fixtures/editor';
import useTransform from '../../../../hooks/editor/Stage/useTransform';
import TemplateList from '../../../common/editor/TemplateList/TemplateList';

function TemplateAsset() {
  const { transformSelectedStageByTemplate } = useTransform();
  return (
    <TemplateList
      items={[templateSample, templateSample, templateSample]}
      onClick={template => transformSelectedStageByTemplate(template)}
    />
  );
}

export default TemplateAsset;
