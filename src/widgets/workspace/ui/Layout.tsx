import React from 'react';
import { Grid, styled } from '@mui/material';
import { withPartial } from 'shared/ui';

export const Header = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(1)};
  background: linear-gradient(to right, #00c4cc, #7300e6);
`;

export const Main = styled(Grid)`
  flex: 1;
  display: flex;
`;

export const Footer = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(1)};
  display: flex;
  align-items: center;
  justify-content: center;
  background: gray;
`;

export const Layout = styled(Grid)`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Sticky = styled(Grid)`
  background: white;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 999;
  padding: ${({ theme }) => theme.spacing(1)};
`;

export const AssetSection = withPartial(Grid, {
  lg: 3,
  container: true,
  item: true,
});

export function CanvasSection({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Grid
      sx={{ width: 1, height: 1, position: 'relative', flex: 1 }}
      onClick={onClick}
    >
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
