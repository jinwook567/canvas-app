import React, { useRef } from 'react';
import { Container, isContainer } from 'features/container';
import { Shape } from 'features/shape';
import { ContainerElement, ShapeElement } from 'shared/canvas';
import { ChildrenTypes, Config as WsConfig } from '../model';

type Config = WsConfig<ChildrenTypes>;

type Props = {
  config: Config;
  onChange?: (config: Config[]) => void;
  onClick?: (id: Config['id']) => void;
};

function Element({ config, onChange, onClick }: Props) {
  const containerRef = useRef<ContainerElement>(null);
  const shapeRef = useRef<ShapeElement>(null);

  const layerEvents = {
    onTransform: (elements: Config[]) => {
      onChange && onChange(elements);
    },
  };
  const groupEvents = {
    onClick: (element: Config) => onClick && onClick(element.id),
  };

  const containerEvents = {
    ...(config.type === 'transformLayer' ? layerEvents : {}),
    ...(config.type === 'group' ? groupEvents : {}),
  };

  return (
    <>
      {isContainer(config) ? (
        <Container {...config} {...containerEvents} ref={containerRef}>
          {config.elements.map(element => (
            <Element
              key={element.id}
              onChange={
                config.type === 'transformLayer' &&
                config.transformers
                  .flatMap(tr => tr.elements)
                  .includes(element.id)
                  ? undefined
                  : onChange
              }
              onClick={onClick}
              config={element}
            />
          ))}
        </Container>
      ) : (
        <Shape
          {...config}
          onChange={configToUpdate => {
            onChange && onChange([{ ...config, ...configToUpdate }]);
          }}
          onClick={config => onClick && onClick(config.id)}
          ref={shapeRef}
        />
      )}
    </>
  );
}

export default Element;
