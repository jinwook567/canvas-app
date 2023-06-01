import { curry } from 'ramda';
import { Stage } from './node';

export type Stages = Stage[];

export const equals = curry(
  (stage1: Stage, stage2: Stage) => stage1.id === stage2.id
);

export const notEquals = curry(
  (stage1: Stage, stage2: Stage) => stage1.id !== stage2.id
);

export const map = curry(<T>(f: (stage: Stage) => T, stages: Stages) =>
  stages.map(f)
);

export const filter = curry((f: (stage: Stage) => boolean, stages: Stages) =>
  stages.filter(f)
);

export const reduce = curry(
  <T>(f: (acc: T, stage: Stage) => T, initialValue: T, stages: Stages) =>
    stages.reduce((acc, stage) => f(acc, stage), initialValue)
);

export const replace = curry((stageToReplace: Stage, stages: Stages) =>
  map(stage => (equals(stage, stageToReplace) ? stageToReplace : stage), stages)
);
