import { GroupConfig } from 'entities/group';
import { Config, Type } from 'features/shape';

interface Container<T> extends GroupConfig<T | Container<T>> {}

export type Child<T> = T | Container<T>;

export type GroupChild = Child<Config<Type>>;
