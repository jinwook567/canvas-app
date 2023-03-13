import React, { RefObject } from 'react';
import { Group, KonvaNodeEvents } from 'react-konva';
import Konva from 'konva';
import Image from '../Image/Image';
import Text from '../Text/Text';
import { ImageConfigWithoutImage } from '../../../../types/editor';

export type Props =
  | ({
      type: 'image';
      config: ImageConfigWithoutImage;
      src?: string;
      nodeRef?: RefObject<Konva.Image>;
    } & KonvaNodeEvents)
  | ({
      type: 'text';
      config: Konva.TextConfig;
      nodeRef?: RefObject<Konva.Text>;
    } & KonvaNodeEvents)
  | ({
      type: 'group';
      config: Konva.GroupConfig;
      nodes: Props[];
      nodeRef?: RefObject<Konva.Group>;
    } & KonvaNodeEvents);

function ShapePicker(props: Props) {
  const { type, config, nodeRef, ...rest } = props;

  switch (type) {
    case 'image':
      const { src } = props;
      return <Image {...config} ref={nodeRef} src={src} {...rest} />;

    case 'text':
      return <Text {...config} ref={nodeRef} {...rest} />;

    case 'group':
      const { nodes } = props;
      return (
        <Group {...config} ref={nodeRef} {...rest}>
          {nodes.map(({ nodeRef, ...nodeRest }, index) => (
            <ShapePicker
              key={index}
              {...nodeRest}
              config={{ ...nodeRest.config, draggable: false }}
            />
          ))}
        </Group>
      );
    default:
      return null;
  }
}

export default React.forwardRef(ShapePicker);
