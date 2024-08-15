import styled from '@emotion/styled';
import { css, Grid } from '@mui/material';

export const Container = styled(Grid)`
  width: 100%;
  position: relative;
`;

export const arrow = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999;
  cursor: pointer;
`;

export const LeftArrowPos = styled(Grid)`
  ${arrow}
  left: -10px;
`;

export const RightArrowPos = styled(Grid)`
  ${arrow}
  right:-10px;
`;

export const ScrollDiv = styled(Grid)`
  width: 100%;
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: scroll;
  overflow-y: hidden;
  position: relative;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
