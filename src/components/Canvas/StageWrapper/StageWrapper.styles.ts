import styled from '@emotion/styled';

export const Wrapper = styled.div<{ checked: boolean }>`
  outline: none;
  &: hover {
    .konvajs-content {
      border: 1px solid black;
    }
  }

  .konvajs-content {
    border: ${({ checked }) => checked && '1px solid black'};
    background: white;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
`;

export default {};
