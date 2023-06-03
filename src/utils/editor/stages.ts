import { curry, identity } from 'ramda';
import { Stage } from './node';

export type Stages = Stage[];

const equals = curry(
  (stage1: Pick<Stage, 'id'>, stage2: Pick<Stage, 'id'>) =>
    stage1.id === stage2.id
);

const notEquals = curry(
  (stage1: Pick<Stage, 'id'>, stage2: Pick<Stage, 'id'>) =>
    stage1.id !== stage2.id
);

const map = curry(<T>(f: (stage: Stage) => T, stages: Stages) => stages.map(f));

const filter = curry((f: (stage: Stage) => boolean, stages: Stages) =>
  stages.filter(f)
);

const reduce = curry(
  <T>(f: (acc: T, stage: Stage) => T, initialValue: T, stages: Stages): T =>
    stages.reduce((acc, stage) => f(acc, stage), initialValue)
);

const replace = curry(
  (stageToBeReplaced: Stage, stageToReplace: Stage, stages: Stages): Stages =>
    map(
      stage => (equals(stage, stageToBeReplaced) ? stageToReplace : stage),
      stages
    )
);

const iter = (stages: Stages): Stage[] => stages.map(identity);

const add =
  (...stagesToAdd: Stages) =>
  (stages: Stages) =>
    [...stages, ...stagesToAdd];

const S = {
  equals,
  notEquals,
  map,
  filter,
  reduce,
  replace,
  add,
  iter,
};

export default S;
