import React from 'react';
import { RecoilRoot } from 'recoil';
import { fireEvent, renderHook, screen, act } from '@testing-library/react';
import ImageAssets from './ImageAssets';
import { createNode } from '../../utils/editor';
import useEditor from '../../hooks/useEditor';
import { imageAssets } from '../../fixtures/editor';

const sampleImg1 =
  'https://images.velog.io/images/sdb016/post/34bdac57-2d63-43ce-a14c-8054e9e036de/test.png';
const sampleImg2 =
  'https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516__340.jpg';

function renderImageAssets() {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RecoilRoot>
      {children}
      <ImageAssets />
    </RecoilRoot>
  );

  const { result } = renderHook(useEditor, { wrapper });

  const Input = () => screen.getByTestId('image-input').querySelector('input');

  const SubmitButton = () => screen.getByTestId('image-submit');

  const Images = () => screen.getAllByRole('img');

  const changeInput = (inputValue: string) => {
    const inputElement = Input();
    if (!inputElement) throw new Error('no input element');

    fireEvent.change(inputElement, { target: { value: inputValue } });
  };

  const clickSubmit = () => {
    fireEvent.submit(SubmitButton());
  };

  return {
    Input,
    SubmitButton,
    Images,
    changeInput,
    clickSubmit,
    result,
  };
}

test('Image Asset url로 추가 테스트', () => {
  const { Input, SubmitButton, changeInput, clickSubmit, Images } =
    renderImageAssets();

  expect(Input()).toBeInTheDocument();
  expect(SubmitButton()).toBeInTheDocument();

  const len = imageAssets.length;

  changeInput(sampleImg1);
  clickSubmit();

  expect(Images()[len + 0].getAttribute('src')).toBe(sampleImg1);

  changeInput(sampleImg2);
  clickSubmit();

  expect(Images()[len + 1]).toBeInTheDocument();
  expect(Images()[len + 1].getAttribute('src')).toBe(sampleImg2);
});

test('Image Assest 동일한 url이 주입될 경우 순서 변경 테스트', () => {
  const { changeInput, clickSubmit, Images } = renderImageAssets();

  const len = imageAssets.length;

  changeInput(sampleImg1);
  clickSubmit();

  changeInput(sampleImg2);
  clickSubmit();

  changeInput(sampleImg2);
  clickSubmit();

  expect(Images()[0].getAttribute('src')).toBe(sampleImg2);
  expect(Images()[len + 1].getAttribute('src')).toBe(sampleImg1);
});

test('Image 클릭 시 Stage로 추가가 잘 되는지 테스트', () => {
  const { Images, changeInput, clickSubmit, result } = renderImageAssets();

  const len = imageAssets.length;

  changeInput(sampleImg1);
  clickSubmit();

  const firstImage = Images()[len + 0] as HTMLImageElement;

  fireEvent.click(firstImage);

  const url = firstImage.getAttribute('src') as string;
  const width = 100;
  const height = 100;
  const x = 50;
  const y = 50;

  const { stageSize } = result.current;

  const nodeArg = { url, width, height, type: 'image' as const };
  const node = {
    ...createNode({
      nodeArg,
      stageSize,
    }),
    width,
    height,
    x,
    y,
  };

  const { id, ...rest } = node;

  const CurrentStages = () =>
    result.current.stages.map(stage =>
      stage.map(s_node => ({
        ...s_node,
        width,
        height,
        x,
        y,
      }))
    );

  expect(CurrentStages()).toEqual([[expect.objectContaining(rest)]]);

  act(() => result.current.handleAppendStage(0));

  fireEvent.click(firstImage);
  expect(CurrentStages()).toEqual([
    [expect.objectContaining(rest)],
    [expect.objectContaining(rest)],
  ]);

  fireEvent.click(firstImage);
  expect(CurrentStages()).toEqual([
    [expect.objectContaining(rest)],
    [expect.objectContaining(rest), expect.objectContaining(rest)],
  ]);

  act(() => result.current.selectStage(0));
  fireEvent.click(firstImage);
  expect(CurrentStages()).toEqual([
    [expect.objectContaining(rest), expect.objectContaining(rest)],
    [expect.objectContaining(rest), expect.objectContaining(rest)],
  ]);
});
