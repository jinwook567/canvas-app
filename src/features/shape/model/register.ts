import { Image, ImageConfig } from 'entities/image';
import { Square, SquareConfig } from 'entities/square';
import { withPartial } from 'shared/ui';

export const image = (config: ImageConfig) => ({
  config,
  Component: withPartial(Image, config),
});

export const square = (config: SquareConfig) => ({
  config,
  Component: withPartial(Square, config),
});
