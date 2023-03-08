import styled from '@emotion/styled';

export const Div = styled.div<{ isSelected: boolean }>`
  border: 3px solid ${props => (props.isSelected ? 'purple' : 'transparent')};

  &:hover {
    border: 3px solid purple;
  }
  width: fit-content;
  outline: none;
`;
