import React, { ForwardedRef, forwardRef, useEffect, useRef } from 'react';
import { Container, isContainer } from 'features/container';
import { Shape } from 'features/shape';
import { NodeElement, ShapeConfig } from 'shared/canvas';
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

  const handleChange = (updateConfig: ShapeConfig) => {
    onChange && onChange([{ ...config, ...updateConfig }]);
  };

  const handleClick = (target: ShapeConfig) => {
    onClick && onClick(target.id);
  };

  const shapeEvents = {
    onChange: handleChange,
    onClick: handleClick,
  };

  const containerEvents = {
    ...(config.type === 'transformLayer' ? layerEvents : {}),
    ...(config.type === 'group' ? shapeEvents : {}),
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
              config={{
                ...element,
                draggable: config.type !== 'group' && element.draggable,
              }}
            />
          ))}
        </Container>
      ) : (
        <Shape {...config} {...shapeEvents} ref={ref} />
      )}
    </>
  );
}

export default forwardRef(Element);
