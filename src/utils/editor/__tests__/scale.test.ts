import { getResizeScale } from '../scale';
import { getSize } from '../size';

const standardSize = getSize(500, 500);

describe('getResizeScale()', () => {
  test('기준 사이즈보다 가로로 더 길 때', () => {
    const width = 250;
    const height = 100;
    expect(getResizeScale(getSize(width, height), standardSize, 1)).toBe(2);
  });

  test('기준 사이즈보다 세로로 더 길 때', () => {
    const width = 100;
    const height = 500;
    expect(getResizeScale(getSize(width, height), standardSize, 1)).toBe(1);
  });
});
