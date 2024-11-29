import {
  LayerConfig,
  Config,
  PackageConfig,
  model,
  setShapes as setLayerShapes,
} from 'entities/canvas';

export type Container = LayerConfig | Config<'group'>;

function isGroup(container: Container): container is Config<'group'> {
  return 'type' in container;
}

export function setShapes(shapes: PackageConfig[], container: Container) {
  const shapeIds = shapes.map(({ id }) => id);
  return isGroup(container)
    ? model('group').setShapes(shapeIds, container)
    : setLayerShapes(shapeIds, container);
}
