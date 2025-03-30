import React from 'react';
import ImageIcon from '@mui/icons-material/Image';
import { withPartial } from 'shared/ui';
import { ImagePanel, sampleImages } from './panel/image';
import InterestsIcon from '@mui/icons-material/Interests';
import { FigurePanel, sampleFigures } from './panel/figure';
import MuiTab from '@mui/material/Tab';

const sx = { textTransform: 'none' };

export const image = {
  Tab: withPartial(MuiTab, {
    label: 'image',
    icon: <ImageIcon />,
    sx,
  }),
  PanelComponent: withPartial(ImagePanel, { items: sampleImages }),
};

export const figure = {
  Tab: withPartial(MuiTab, {
    label: 'figure',
    icon: <InterestsIcon />,
    sx,
  }),
  PanelComponent: withPartial(FigurePanel, { items: sampleFigures }),
};
