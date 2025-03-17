import * as table from './register';

export type Type = keyof typeof table;
type Table = typeof table;

export type Config<T extends Type> = Parameters<Table[T]>[0];

export const get = <T extends Type>(type: T) =>
  table[type] as (config: Config<T>) => ReturnType<Table[T]>;
