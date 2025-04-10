import { v4 as uuidv4 } from 'uuid';

export const createUniqueId = () => uuidv4();

export const pick = <T, K extends keyof T>(
  obj: T,
  ...rest: K[]
): Pick<T, K> => {
  const newObj = {} as Pick<T, K>;
  rest.forEach(key => {
    newObj[key] = obj[key];
  });
  return newObj;
};

export const omit = <T, K extends keyof T>(
  obj: T,
  ...rest: K[]
): Omit<T, K> => {
  const newObj = { ...obj };
  rest.forEach(key => {
    delete newObj[key];
  });
  return newObj;
};

export const zipmap = <
  const T extends ReadonlyArray<readonly [PropertyKey, unknown]>
>(
  a: T
) => {
  return Object.fromEntries(a) as { [K in T[number] as K[0]]: K[1] };
};
