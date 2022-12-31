import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { stagesState } from '../../recoil/editor';
import { RecoilObserver } from '../../utils/test';
import Stages from './Stages';

// Stages 파트만 커스텀 훅으로 테스트한다.

test('Stage 추가 테스트', async () => {
  const onChange = jest.fn();
  render(
    <RecoilRoot>
      <RecoilObserver node={stagesState} onChange={onChange} />
      <Stages />
    </RecoilRoot>
  );

  // const addButton = screen.getByTestId('add-stage-0');
  const button = await screen.findByText('Stage 추가');

  fireEvent.click(button);

  expect(onChange).toBeCalled();
});

export default {};
