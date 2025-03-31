import React, { ForwardedRef, forwardRef, useEffect, useRef } from 'react';
import { Container, isContainer } from 'features/container';
import { Shape } from 'features/shape';
import { NodeElement } from 'shared/canvas';
import { ChildrenTypes, Config as WsConfig } from '../model';
import { setRef } from 'shared/lib';

type Config = WsConfig<ChildrenTypes>;

type Props = {
  config: Config;
  onChange?: (config: Config[]) => void;
  onClick?: (id: Config['id']) => void;
};

function Element(
  { config, onChange, onClick }: Props,
  ref: ForwardedRef<NodeElement>
) {
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
        <Container
          {...config}
          {...containerEvents}
          ref={node => node && setRef(ref, node)}
        >
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
          ref={ref}
        />
      )}
    </>
  );
}

export default forwardRef(Element);
