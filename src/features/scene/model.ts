import { StageConfig } from 'entities/stage';
import { Config as ContainerConfig } from 'features/container';

export type Config = StageConfig<ContainerConfig<'layer'>>;
