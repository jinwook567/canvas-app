import { atom } from 'jotai';
import {
  Config as ContainerConfig,
  Type as ContainerType,
  types as containerTypes,
  elementTypes,
  Item,
} from 'features/container';
import {
  Config as ShapeConfig,
  Type as ShapeType,
  types as shapeTypes,
} from 'features/shape';
import { NodeConfig } from 'shared/canvas';
import { omit, zipmap } from 'shared/lib';

export type Id = NodeConfig['id'];

export type Root = { type: 'root'; children: Id[]; id: Id; parent: null };
export type Container<T extends ContainerType> = Omit<
  ContainerConfig<T>,
  'elements'
> & {
  children: Id[];
  parent: Id;
};
export type Shape<T extends ShapeType> = ShapeConfig<T> & { parent: Id };

type Containers = ContainerType extends infer A
  ? A extends ContainerType
    ? Container<A>
    : never
  : never;

type Shapes = ShapeType extends infer A
  ? A extends ShapeType
    ? Shape<A>
    : never
  : never;

export type Workspace = {
  [key: Id]: Root | Containers | Shapes;
};

export type U = Workspace[Id];

export type Types = Workspace[Id]['type'];

export const hierarchy = {
  root: ['stage' as const],

  ...(zipmap(containerTypes.map(type => [type, elementTypes(type)])) as {
    [K in ContainerType]: Item<K>['elementTypes'];
  }),

  ...zipmap(shapeTypes.map(type => [type, []])),
} satisfies { [K in Types]: Types[] };

export const level = (type: Workspace[Id]['type']): number => {
  return 1 + Math.max(...hierarchy[type].filter(l => l !== type).map(level));
};

export type Hierarchy = typeof hierarchy;

export type ByType<T extends Types> = T extends 'root'
  ? Root
  : T extends ContainerType
  ? Container<T>
  : T extends ShapeType
  ? Shape<T>
  : never;

export type Child<T extends Types> = Hierarchy[T][number] extends infer A
  ? A extends Types
    ? ByType<A>
    : never
  : never;

export type Parent<T extends Types> = Types extends infer A
  ? A extends Types
    ? T extends Hierarchy[A][number]
      ? ByType<A>
      : never
    : never
  : never;

export type ParentTypes = Types extends infer A
  ? A extends Types
    ? Child<A> extends never
      ? never
      : A
    : never
  : never;

export type ChildrenTypes = Types extends infer A
  ? A extends Types
    ? Parent<A> extends never
      ? never
      : A
    : never
  : never;

export const isChildren = (
  config: Workspace[Id]
): config is ByType<ChildrenTypes> => config.parent !== null;

export const isParent = (
  config: Workspace[Id]
): config is ByType<ParentTypes> => hierarchy[config.type].length > 0;

export const isLeaf = (config: Workspace[Id]): config is Shapes =>
  shapeTypes.some(type => type === config.type);

export const workspaceAtom = atom<Workspace>({});

export const get = <T extends Workspace, P extends keyof T>(
  workspace: T,
  id: P
) => workspace[id];

export const getParent = <T extends ChildrenTypes>(
  workspace: Workspace,
  config: ByType<T>
) => workspace[config.parent] as Parent<T>;

export const getChildren = <T extends ParentTypes>(
  workspace: Workspace,
  config: ByType<T>
) => {
  return config.children.map(id => get(workspace, id)) as Child<T>[];
};

export const update = (workspace: Workspace, config: Workspace[Id]) => {
  return { ...workspace, [config.id]: config };
};

export const remove = (workspace: Workspace, config: Workspace[Id]) => {
  const rest = omit(workspace, config.id);

  if (isChildren(config)) {
    const parent = getParent(workspace, config);
    return update(rest, {
      ...parent,
      children: parent.children.filter(id => id !== config.id),
    });
  } else return rest;
};

export const insert = <
  T extends ParentTypes,
  P extends ByType<T>,
  U extends Child<P['type']>
>(
  workspace: Workspace,
  parent: P,
  config: U,
  order: (children: Id[], id: Id) => Id[] = (children, id) => [...children, id]
) => {
  return update(
    update(workspace, {
      ...parent,
      children: order(parent.children, (config as Child<ParentTypes>).id),
    }),
    config
  );
};

export type Config<T extends ChildrenTypes> = T extends ContainerType
  ? ContainerConfig<T>
  : T extends ShapeType
  ? ShapeConfig<T>
  : never;

export const tree = <
  T extends ParentTypes,
  P extends ByType<T>,
  U extends Child<P['type']>
>(
  workspace: Workspace,
  root: P
): { elements: Config<U['type']>[] } & P => {
  return {
    ...root,
    elements: getChildren(workspace, root).map(child =>
      isParent(child) ? tree(workspace, child) : child
    ) as Config<U['type']>[],
  };
};

export const giveHierarchy = <T extends ChildrenTypes>(
  workspace: Workspace,
  config: Config<T>
): Config<T> & ByType<T> => {
  const detail = get(workspace, config.id);
  const children = isParent(detail) ? { children: detail.children } : {};
  return { ...config, parent: detail.parent, ...children } as Config<T> &
    ByType<T>;
};
