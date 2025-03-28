import * as table from './register';
export { toLayer, toTransformLayer } from './derived/transformLayer';

export type Type = keyof typeof table;
type Table = typeof table;

export type Config<T extends Type> = Parameters<Table[T]>[0];

export type Item<T extends Type> = ReturnType<Table[T]>;

export const get = <T extends Type>(
  config: Config<T>
): ReturnType<Table[T]> => {
  const f = table[config.type] as (config: Config<T>) => ReturnType<Table[T]>;
  return f(config);
};

export const elementTypes = <T extends Type>(type: T) =>
  get({ type } as Config<T>).elementTypes as Item<T>['elementTypes'];

export const types = Object.keys(table) as Type[];

export const isContainer = (config: {
  type: string;
}): config is Config<Type> => {
  return types.some(type => type === config.type);
};
