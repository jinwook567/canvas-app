import React, { useState } from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import ImageIcon from '@mui/icons-material/Image';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { Grid } from '@mui/material';
import useTabs from 'components/common/Tabs/useTabs';
import ImageAsset from 'pages/editor/_components/asset/ImageAsset';
import TemplateAsset from 'pages/editor/_components/asset/TemplateAsset';
import TextAsset from 'pages/editor/_components/asset/TextAsset';
import useSelect from 'hooks/editor/stage/useSelect';
import useAdd from 'hooks/editor/node/useAdd';
import { isShape, Node } from 'utils/editor/node';
import useTransform from 'hooks/editor/stage/useTransform';

function Asset() {
  const [imageItems, setImageItems] = useState<{ src: string }[]>([
    { src: `${process.env.PUBLIC_URL}/yoda.jpg` },
  ]);

  const { selectedStage } = useSelect();
  const { addNodeToStage } = useAdd();
  const { applyTemplate } = useTransform();

  const addAsset = (node: Node) => {
    if (selectedStage) {
      if (isShape(node)) addNodeToStage(node, selectedStage);
      else applyTemplate(node, selectedStage);
    }
  };

  const asset = [
    {
      tab: { label: '이미지', icon: <ImageIcon /> },
      component: (
        <ImageAsset
          items={imageItems}
          addItem={src => setImageItems(currentVal => [...currentVal, { src }])}
          addAsset={addAsset}
        />
      ),
    },
    {
      tab: { label: '템플릿', icon: <GridViewIcon /> },
      component: <TemplateAsset addAsset={addAsset} />,
    },
    {
      tab: { label: '텍스트', icon: <FormatColorTextIcon /> },
      component: <TextAsset />,
    },
  ];

  const [selectedIndex, renderTabs] = useTabs({
    orientation: 'vertical',
    items: asset.map(item => item.tab),
  });

  return (
    <Grid container>
      {renderTabs()}
      <Grid flex={1} padding={2}>
        {asset[selectedIndex].component}
      </Grid>
    </Grid>
  );
}

export default Asset;
