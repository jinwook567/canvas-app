/* eslint-disable react/no-array-index-key */
import React from 'react';
import Masonry from '@mui/lab/Masonry';
import { useRecoilValue } from 'recoil';
import { stage } from '../../../../fixtures/editor';
import useAsset from '../../../../hooks/useAsset';
import { stageSizeState } from '../../../../recoil/editor';
import { Template } from '../../../../types/editor';
import { applyScaleToNode, getScale } from '../../../../utils/editor';
import { pick } from '../../../../utils/unit';
import CanvasThumbnail from './CanvasThumbnail';

function TemplateList() {
  const templateList = [stage, stage, stage];

  const { applyTemplate } = useAsset();
  const currentStageSize = useRecoilValue(stageSizeState);

  const handleApplyTemplate = (template: Template) => {
    const scale = getScale(pick(template, 'width', 'height'), currentStageSize);
    const nodes = template.nodes.map(node => applyScaleToNode({ node, scale }));
    applyTemplate(nodes);
  };

  return (
    <Masonry columns={2}>
      {templateList.map((template, index) => (
        <CanvasThumbnail
          key={index}
          template={template}
          onClick={handleApplyTemplate}
        />
      ))}
    </Masonry>
  );
}

export default TemplateList;
