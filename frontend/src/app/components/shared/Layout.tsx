import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import LeftNavigationDrawer from '../drawer/LeftNavigationDrawer';
import Navbar from './Navbar';

export type LayoutProps = {
  minimalNavbar?: boolean;
  title: string;
  marginTop: number;
};
function Layout(props: PropsWithChildren<LayoutProps>) {
  return (
    <section>
      <Navbar minimalNavbar={props.minimalNavbar} />
      <Box sx={(theme) => ({ display: 'flex', margin: theme.spacing(1) })}>
        <LeftNavigationDrawer />
        <main style={{ marginTop: props.marginTop }}>
          <section>
            <div>{props.children}</div>
          </section>
        </main>
      </Box>
    </section>
  );
}

export default Layout;
