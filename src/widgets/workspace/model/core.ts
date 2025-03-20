import { atom } from 'jotai';
import {
  Config as ContainerConfig,
  Type as ContainerType,
  types as containerTypes,
} from 'features/container';
import { Config as SceneConfig } from 'features/scene';
import {
  Config as ShapeConfig,
  Type as ShapeType,
  types as shapeTypes,
} from 'features/shape';
import { NodeConfig } from 'shared/canvas';
import { omit, zipmap } from 'shared/lib';

export type Id = NodeConfig['id'];

export type Root = { type: 'root'; children: Id[]; id: Id; parent: null };
export type Scene = Omit<SceneConfig, 'layers'> & {
  children: Id[];
  parent: Id;
};
export type Container<T extends ContainerType> = Omit<
  ContainerConfig<T>,
  'shapes'
> & {
  children: Id[];
  parent: Id;
};
export type Shape<T extends ShapeType> = ShapeConfig<T> & { parent: Id };

export type Workspace = {
  [key: Id]: Root | Scene | Container<ContainerType> | Shape<ShapeType>;
};

export const hierarchy = {
  root: ['stage'],
  stage: ['layer'],
  layer: [...containerTypes.filter(type => type !== 'layer'), ...shapeTypes],
  ...zipmap(
    containerTypes
      .filter(type => type !== 'layer')
      .map(type => [type, [...shapeTypes, type]])
  ),
  ...zipmap(shapeTypes.map(type => [type, []])),
} as const;

export const level = (type: Workspace[Id]['type']): number => {
  return 1 + Math.max(...hierarchy[type].filter(l => l !== type).map(level));
};

type Child<T extends Workspace[Id]> = T extends Root
  ? Scene
  : T extends Scene
  ? Container<'layer'>
  : T extends Container<ContainerType>
  ? Container<'group'> | Shape<ShapeType>
  : never;
type HasChildren = Workspace[Id] extends infer A
  ? A extends { children: Id[] }
    ? A
    : never
  : never;
type HasParent = Workspace[Id] extends infer A
  ? A extends { parent: Id }
    ? A
    : never
  : never;

export const workspaceAtom = atom<Workspace>({});

export const get = <T extends Workspace, P extends keyof T>(
  workspace: T,
  id: P
) => workspace[id];

export const getParent = (workspace: Workspace, config: HasParent) =>
  workspace[config.parent] as HasChildren;

export const getChildren = <T extends HasChildren>(
  workspace: Workspace,
  config: T
) => {
  return config.children.map(id => get(workspace, id)) as Child<T>[];
};

export const update = (workspace: Workspace, config: Workspace[Id]) => {
  return { ...workspace, [config.id]: config };
};

export const remove = (workspace: Workspace, config: Workspace[Id]) => {
  const rest = omit(workspace, config.id);

  if (config.parent) {
    const parent = getParent(workspace, config);
    return update(rest, {
      ...parent,
      children: parent.children.filter(id => id !== config.id),
    });
  } else return rest;
};

export const insert = <T extends HasChildren>(
  workspace: Workspace,
  parent: T,
  config: Child<T>,
  order: (children: Id[], id: Id) => Id[] = (children, id) => [...children, id]
) => {
  return update(
    update(workspace, {
      ...parent,
      children: order(parent.children, config.id),
    }),
    config
  );
};

export const isContainer = (
  config: Workspace[Id]
): config is Container<ContainerType> =>
  containerTypes.some(type => type === config.type);

type Config<T extends HasParent> = T extends Scene
  ? SceneConfig
  : T['type'] extends ContainerType
  ? ContainerConfig<T['type']>
  : T;

export const isScene = (config: Workspace[Id]): config is Scene =>
  config.type === 'stage';

export const tree = <T extends HasChildren>(
  workspace: Workspace,
  root: T
): Config<Child<T>>[] => {
  return getChildren(workspace, root).map(child => {
    if (isContainer(child) || isScene(child)) {
      const name = isContainer(child) ? 'shapes' : 'layers';
      return {
        ...omit(child, 'parent', 'children'),
        [name]: tree(workspace, child),
      };
    } else {
      return child;
    }
  }) as Config<Child<T>>[];
};
