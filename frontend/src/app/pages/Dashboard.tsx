import { Container, Grid, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Layout from '../components/shared/Layout';
import Test from './Test';

export default function Dashboard() {
  return (
    <Layout title='Feed' marginTop={0}>
      <Box sx={(theme) => ({ display: 'flex', margin: theme.spacing(1) })}>
        <Container maxWidth='lg' sx={{ mt: 8, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component='h2' variant='h6' color='primary' gutterBottom>
                  Test
                </Typography>
                <Test />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}
