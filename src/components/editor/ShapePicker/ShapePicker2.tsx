import React, { RefObject } from 'react';
import { Group } from 'react-konva';
import Konva from 'konva';
import Image from '../Image/Image';
import Text from '../Text/Text';

type Props =
  | {
      type: 'image';
      config: Konva.ImageConfig;
      src?: string;
      nodeRef?: RefObject<Konva.Image>;
    }
  | {
      type: 'text';
      config: Konva.TextConfig;
      nodeRef?: RefObject<Konva.Text>;
    }
  | {
      type: 'group';
      config: Konva.GroupConfig;
      nodes: Props[];
      nodeRef?: RefObject<Konva.Group>;
    };

function ShapePicker(props: Props) {
  const { type, config, nodeRef } = props;

  switch (type) {
    case 'image':
      const { src } = props;
      return <Image {...config} ref={nodeRef} src={src} />;

    case 'text':
      return <Text {...config} ref={nodeRef} />;

    case 'group':
      const { nodes } = props;
      return (
        <Group {...config} ref={nodeRef}>
          {nodes.map((node, index) => (
            <ShapePicker key={index} {...node} />
          ))}
        </Group>
      );
    default:
      return null;
  }
}

export default React.forwardRef(ShapePicker);
