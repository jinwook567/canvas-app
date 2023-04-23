import styled from '@emotion/styled';
import { Grid as MuiGrid } from '@mui/material';

export const Grid = styled(MuiGrid)`
  width: 100%;
  background: lightgray;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-height: 90vh;
  overflow: auto;
  align-items: center;
`;
