import React from 'react';
import { Config } from 'features/shape';
import { Gallery } from 'shared/ui';
import Image from 'components/editor/Image';
import { createUniqueId } from 'shared/lib';

type Props = {
  onClick: (config: Config<'image'>) => void;
  items: { src: string }[];
};

function ImagePanel({ items, onClick }: Props) {
  return (
    <Gallery>
      <Gallery.Mansory>
        {items.map((item, index) => (
          <Gallery.Item key={index}>
            <Image
              src={item.src}
              onClick={image => {
                onClick({
                  type: 'image',
                  source: image,
                  width: image.width,
                  height: image.height,
                  id: createUniqueId(),
                  x: 10,
                  y: 10,
                });
              }}
            />
          </Gallery.Item>
        ))}
      </Gallery.Mansory>
    </Gallery>
  );
}

export default ImagePanel;
