import { Config } from 'features/shape';
import React from 'react';

type Props = {
  onClick: (config: Config<'square'>) => void;
  items: Pick<Config<'square'>, 'cornerRadius' | 'width' | 'height'>;
};

function FigurePanel({ onClick, items }: Props) {
  return <div>FigurePanel</div>;
}

export default FigurePanel;
