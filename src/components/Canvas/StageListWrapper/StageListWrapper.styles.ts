import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Wrapper = styled(Grid)`
  width: 100%;
  background: lightgray;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-height: 90vh;
  overflow: auto;
  align-items: center;
`;

export default {};
