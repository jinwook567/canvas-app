import { Config } from 'features/shape';
import React from 'react';
import { Gallery } from 'shared/ui';
import { Element } from 'widgets/workspace/ui';
import { previewConfig } from 'widgets/workspace/model';
import { createUniqueId } from 'shared/lib';

export type Props = {
  onClick: (config: Config<'square'>) => void;
  items: Pick<Config<'square'>, 'cornerRadius' | 'width' | 'height' | 'fill'>[];
};

function FigurePanel({ onClick, items }: Props) {
  const configs = items.map(item => ({
    ...item,
    x: 0,
    y: 0,
    id: createUniqueId(),
    type: 'square' as const,
    width: 80,
    height: 80,
  }));

  return (
    <Gallery>
      <Gallery.Mansory>
        {configs.map(config => (
          <Gallery.Item onClick={() => onClick(config)} key={config.id}>
            <Element
              config={previewConfig({ width: 80, height: 80 }, config)}
            />
          </Gallery.Item>
        ))}
      </Gallery.Mansory>
    </Gallery>
  );
}

export default FigurePanel;
