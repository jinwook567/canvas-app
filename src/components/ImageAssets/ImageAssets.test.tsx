import React from 'react';
import { RecoilRoot } from 'recoil';
import { fireEvent, render, screen } from '@testing-library/react';
import ImageAssets from './ImageAssets';

test('ImageAssets 컴포넌트 테스트', async () => {
  render(
    <RecoilRoot>
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
  expect(addedImages[0].getAttribute('src')).toBe(inputValue2);

  // recoil 관련 테스트 로직 추가하기.
});
