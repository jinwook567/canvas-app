import React from 'react';
import { Config } from './model';
import { Stage, layers } from 'entities/stage';
import { Container } from 'features/container';

type Props = Config;

function Scene(props: Props) {
  return (
    <Stage {...props}>
      {layers(props).map(layer => (
        <Container {...layer} key={layer.id} />
      ))}
    </Stage>
  );
}

export default Scene;
