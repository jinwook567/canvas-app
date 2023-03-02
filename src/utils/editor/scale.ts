import { Size } from '../../types/editor';

function getResizeScale(targetSize: Size, standardSize: Size, ratio: number) {
  if (getRatio(targetSize) > getRatio(standardSize)) {
    return getScale(targetSize.width, standardSize.width * ratio);
  }
  return getScale(targetSize.height, standardSize.height * ratio);

  function getRatio(size: Size) {
    return size.width / size.height;
  }

  function getScale(target: number, standard: number) {
    return standard / target;
  }
}

export { getResizeScale };
