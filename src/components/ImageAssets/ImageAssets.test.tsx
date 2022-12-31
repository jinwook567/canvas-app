import React from 'react';
import { RecoilRoot } from 'recoil';
import { fireEvent, renderHook, screen, act } from '@testing-library/react';
import ImageAssets from './ImageAssets';
import { createNode } from '../../utils/editor';
import useEditor from '../../hooks/useEditor';

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

  changeInput('value1');
  clickSubmit();

  expect(Images()[0].getAttribute('src')).toBe('value1');

  changeInput('value2');
  clickSubmit();

  expect(Images()[1]).toBeInTheDocument();
  expect(Images()[1].getAttribute('src')).toBe('value2');
});

test('Image Assest 동일한 url이 주입될 경우 순서 변경 테스트', () => {
  const { changeInput, clickSubmit, Images } = renderImageAssets();

  changeInput('value1');
  clickSubmit();

  changeInput('value2');
  clickSubmit();

  changeInput('value2');
  clickSubmit();

  expect(Images()[0].getAttribute('src')).toBe('value2');
  expect(Images()[1].getAttribute('src')).toBe('value1');
});

test('Image 클릭 시 Stage로 추가가 잘 되는지 테스트', () => {
  const { Images, changeInput, clickSubmit, result } = renderImageAssets();

  changeInput('value1');
  clickSubmit();

  fireEvent.click(Images()[0]);

  const url = Images()[0].getAttribute('src');
  const node = url
    ? createNode({
        type: 'image',
        url,
      })
    : { id: 1 };

  const { id, ...rest } = node;

  expect(result.current.stages).toEqual([[expect.objectContaining(rest)]]);

  act(() => result.current.handleAppendStage(0));

  fireEvent.click(Images()[0]);
  expect(result.current.stages).toEqual([
    [expect.objectContaining(rest)],
    [expect.objectContaining(rest)],
  ]);

  fireEvent.click(Images()[0]);
  expect(result.current.stages).toEqual([
    [expect.objectContaining(rest)],
    [expect.objectContaining(rest), expect.objectContaining(rest)],
  ]);

  act(() => result.current.selectStage(0));
  fireEvent.click(Images()[0]);
  expect(result.current.stages).toEqual([
    [expect.objectContaining(rest), expect.objectContaining(rest)],
    [expect.objectContaining(rest), expect.objectContaining(rest)],
  ]);
});
