import styled from '@emotion/styled';

export const Container = styled.div<{ checked: boolean }>`
  border: ${({ checked }) => checked && '1px solid black'};
  &: hover {
    border: 1px solid black;
  }
`;

export default {};
