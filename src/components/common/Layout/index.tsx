import { Grid } from '@mui/material';
import React from 'react';
import Footer from 'components/common/Layout/Footer';
import Header from 'components/common/Layout/Header';
import Main from 'components/common/Layout/Main';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <Grid sx={{ height: '100vh' }} container flexDirection="column">
      {children}
    </Grid>
  );
}

Layout.Header = Header;
Layout.Main = Main;
Layout.Footer = Footer;

export default Layout;
