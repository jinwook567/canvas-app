import styled from '@emotion/styled';
import { Grid, IconButton } from '@mui/material';

export const Container = styled(Grid)`
  width: 100%;
`;

export const Button = styled(IconButton)`
  display: inline;
  &:hover {
    background-color: transparent;
  }
`;

export const HorizontalContainer = styled(Grid)`
  max-height: 120px;
`;
