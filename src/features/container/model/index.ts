import { ForwardRefExoticComponent } from 'react';
import * as table from './register';

export type Type = keyof typeof table;
type Table = typeof table;

export type Config<T extends Type> = Parameters<Table[T]>[0];

export type Item<T extends Type> = ReturnType<Table[T]>;

export const get = <T extends Type>(type: T) =>
  table[type] as (config: Config<T>) => ReturnType<Table[T]>;

export const elementTypes = <T extends Type>(type: T) =>
  get(type)({ type } as Config<T>).elementTypes as Item<T>['elementTypes'];

export const types = Object.keys(table) as Type[];

export const isContainer = (config: {
  type: string;
}): config is Config<Type> => {
  return types.some(type => type === config.type);
};

export const getElement = <T extends Type>(config: Config<T>) =>
  get(config.type)(config).Element as ForwardRefExoticComponent<
    Item<T>['elements'][number]
  >;
