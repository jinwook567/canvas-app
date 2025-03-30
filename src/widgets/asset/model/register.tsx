import React from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { Tab, withPartial } from 'shared/ui';
import { ImagePanel, sampleImages } from './panel/image';

export const image = {
  Tab: <Tab label={'image'} icon={<ImageIcon />} />,
  PanelComponent: withPartial(ImagePanel, { items: sampleImages }),
};

export const figure = {};
