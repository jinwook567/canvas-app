import React, { RefObject, useEffect, useRef } from 'react';
import { Group } from 'react-konva';
import Konva from 'konva';
import Image from '../Image/Image';
import Text from '../Text/Text';

type Props =
  | {
      type: 'image';
      config: Konva.ImageConfig;
      isSelected: boolean;
      updateTransformer: (ref: RefObject<Konva.Image>) => void;
    }
  | {
      type: 'text';
      config: Konva.TextConfig;
      isSelected: boolean;
      updateTransformer: (ref: RefObject<Konva.Text>) => void;
    }
  | {
      type: 'group';
      config: Konva.GroupConfig;
      items: Props[];
      isSelected: boolean;
      updateTransformer: (ref: RefObject<Konva.Group>) => void;
    };

function ShapePicker(props: Props) {
  const { type, config, isSelected, updateTransformer } = props;
  const ref = useRef(null);

  useEffect(() => {
    updateTransformer(ref);
  }, [isSelected]);

  switch (type) {
    case 'image':
      return <Image {...config} ref={ref} />;

    case 'text':
      return <Text {...config} ref={ref} />;

    case 'group':
      const { items } = props;
      return (
        <Group {...config} ref={ref}>
          {items.map((item, index) => (
            <ShapePicker key={index} {...item} isSelected={false} />
          ))}
        </Group>
      );
    default:
      return null;
  }
}

export default ShapePicker;
