import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Container = styled(Grid)`
  width: 100%;
  background: lightgray;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-height: 90vh;
  overflow: auto;
`;

export const StageArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
