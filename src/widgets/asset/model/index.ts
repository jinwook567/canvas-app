import * as table from './register';

type Table = typeof table;

export type Type = keyof Table;

export const get = <T extends Type>(type: T) => table[type];

export const types = Object.keys(table) as Type[];

export type Item<T extends Type> = Table[T];
