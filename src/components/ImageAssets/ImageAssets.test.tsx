import React from 'react';
import { RecoilRoot } from 'recoil';
import { fireEvent, render, screen } from '@testing-library/react';
import ImageAssets from './ImageAssets';
import { RecoilObserver } from '../../utils/test';
import { stagesState } from '../../recoil/editor';
import { createNode } from '../../utils/editor';

test('ImageAssets 컴포넌트 테스트', async () => {
  const onChange = jest.fn();
  render(
    <RecoilRoot>
      <RecoilObserver node={stagesState} onChange={onChange} />
      <ImageAssets />
    </RecoilRoot>
  );

  const input = (await screen.findByTestId('image-input')).querySelector(
    'input'
  );

  const submit = await screen.findByTestId('image-submit');

  if (!input) throw new Error('no input');

  const inputValue1 = 'ddddd1';
  const inputValue2 = 'ddddd2';

  fireEvent.change(input, { target: { value: inputValue1 } });
  fireEvent.submit(submit);

  fireEvent.change(input, { target: { value: inputValue2 } });
  fireEvent.submit(submit);

  const images = await screen.findAllByRole('img');

  expect(images[0]).toBeInTheDocument();
  expect(images[0].getAttribute('src')).toBe(inputValue1);

  expect(images[1]).toBeInTheDocument();
  expect(images[1].getAttribute('src')).toBe(inputValue2);

  fireEvent.change(input, { target: { value: inputValue2 } });
  fireEvent.submit(submit);

  const addedImages = await screen.findAllByRole('img');
  const firstImage = addedImages[0];
  expect(firstImage.getAttribute('src')).toBe(inputValue2);

  // 이미지 Stage 추가 로직 테스트
  fireEvent.click(firstImage);

  const url = firstImage.getAttribute('src');

  const node = url
    ? createNode({
        type: 'image',
        url,
      })
    : { id: 1 };

  const { id, ...rest } = node;

  expect(onChange).toBeCalledWith([[]]);
  expect(onChange).toBeCalledWith(
    expect.arrayContaining([[expect.objectContaining(rest)]])
  );
  // Stage가 여러개 될 때 해당 배열에 잘 들어가는지도 테스트 해야함.
});
