import {
  Config as ContainerConfig,
  Type as ContainerType,
  types as containerTypes,
  elementTypes,
  isContainer,
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

export type NodeType = 'root' | ContainerType | ShapeType;
export type Node<Type extends NodeType> = Type extends ContainerType
  ? Container<Type>
  : Type extends ShapeType
  ? Shape<Type>
  : Root;

export type Workspace<Type extends NodeType = NodeType> = {
  [key: Id]: Node<Type>;
};

export const hierarchy = {
  root: ['stage' as const],

  ...(zipmap(containerTypes.map(type => [type, elementTypes(type)])) as {
    [K in ContainerType]: Item<K>['elementTypes'];
  }),

  ...zipmap(shapeTypes.map(type => [type, []])),
} satisfies { [K in NodeType]: NodeType[] };

export const level = (type: NodeType): number => {
  return 1 + Math.max(0, ...hierarchy[type].filter(l => l !== type).map(level));
};

export type Hierarchy = typeof hierarchy;

export type Child<T extends NodeType> = Hierarchy[T][number];
export type Parent<T extends NodeType> = {
  [K in NodeType]: T extends Hierarchy[K][number] ? K : never;
}[NodeType];

export type HasChildren = {
  [K in NodeType]: Child<K> extends never ? never : K;
}[NodeType];

export type HasParent = {
  [K in NodeType]: Parent<K> extends never ? never : K;
}[NodeType];

export const hasChildren = (node: Node<NodeType>): node is Node<HasChildren> =>
  hierarchy[node.type].length > 0;

export const hasParent = (node: Node<NodeType>): node is Node<HasParent> =>
  node.parent !== null;

export const get = <T extends Workspace, P extends keyof T>(
  workspace: T,
  id: P
) => workspace[id];

export const getParent = <T extends HasParent>(
  workspace: Workspace,
  node: Node<T>
) => workspace[node.parent] as Node<Parent<T>>;

export const getChildren = <T extends HasChildren>(
  workspace: Workspace,
  node: Node<T>
) => node.children.map(id => get(workspace, id)) as Node<Child<T>>[];

export const update = (workspace: Workspace, node: Workspace[Id]) => ({
  ...workspace,
  [node.id]: node,
});

export const remove = (workspace: Workspace, node: Workspace[Id]) => {
  const rest = omit(workspace, node.id);

  if (hasParent(node)) {
    const parent = getParent(workspace, node);
    return update(rest, {
      ...parent,
      children: parent.children.filter(id => id !== node.id),
    });
  } else return rest;
};

export const insert = <
  P extends Node<HasChildren>,
  U extends Node<Child<P['type']>>
>(
  workspace: Workspace,
  parent: P,
  node: U,
  order: (children: Id[], id: Id) => Id[] = (children, id) => [...children, id]
) => {
  return update(
    update(workspace, {
      ...parent,
      children: order(parent.children, node.id),
    }),
    node
  );
};

export type Config<T extends ContainerType | ShapeType> =
  T extends ContainerType
    ? ContainerConfig<T>
    : T extends ShapeType
    ? ShapeConfig<T>
    : never;

export const tree = <P extends Node<HasChildren>>(
  workspace: Workspace,
  root: P
): { elements: Config<Child<P['type']>>[] } & P => {
  return {
    ...root,
    elements: getChildren(workspace, root).map(child =>
      hasChildren(child) ? tree(workspace, child) : child
    ) as unknown as Config<Child<P['type']>>[],
  };
};

export const giveHierarchy = <T extends HasParent>(
  workspace: Workspace,
  config: Config<T>
): Config<T> & Node<T> => {
  const detail = get(workspace, config.id);
  const children = hasChildren(detail) ? { children: detail.children } : {};
  return { ...config, parent: detail.parent, ...children } as Config<T> &
    Node<T>;
};

export const types = ['root' as const, ...containerTypes, ...shapeTypes];

export const toWorkspace = (
  config: Config<HasParent>,
  parent: Id
): Workspace => {
  if (isContainer(config)) {
    return config.elements.reduce(
      (ws, el) => ({ ...ws, ...toWorkspace(el, config.id) }),
      {
        [config.id]: {
          ...config,
          parent,
          children: config.elements.map(el => el.id),
        },
      } as Workspace
    );
  } else {
    return { [config.id]: { ...config, parent } };
  }
};
