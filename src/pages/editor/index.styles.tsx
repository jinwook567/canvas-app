import React from 'react';
import { Grid, styled } from '@mui/material';

export const Header = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(1)};
  background: linear-gradient(to right, #00c4cc, #7300e6);
`;

export const Main = styled(Grid)`
  flex: 1;
  display: flex;
  background: yellow;
`;

export function CanvasSection({ children }: { children: React.ReactNode }) {
  return (
    <Grid sx={{ width: 1, height: 1, position: 'relative' }}>
      <Grid
        sx={{
          width: 1,
          height: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'absolute',
          background: 'lightgray',
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
}

export const Footer = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(1)};
  display: flex;
  align-items: center;
  justify-content: center;
  background: gray;
`;

export const Container = styled(Grid)`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
