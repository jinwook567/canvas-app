import styled from '@emotion/styled';

export const Wrapper = styled.div<{ checked: boolean }>`
  border: ${({ checked }) => checked && '1px solid black'};
  outline: none;
  &: hover {
    border: 1px solid black;
  }
`;

export default {};
