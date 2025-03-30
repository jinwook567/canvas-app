import React from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { Tab, withPartial } from 'shared/ui';
import { ImagePanel, sampleImages } from './panel/image';
import InterestsIcon from '@mui/icons-material/Interests';
import { FigurePanel, sampleFigures } from './panel/figure';

export const image = {
  Tab: <Tab label={'image'} icon={<ImageIcon />} />,
  PanelComponent: withPartial(ImagePanel, { items: sampleImages }),
};

export const figure = {
  Tab: <Tab label={'square'} icon={<InterestsIcon />} />,
  PanelComponent: withPartial(FigurePanel, { items: sampleFigures }),
};
