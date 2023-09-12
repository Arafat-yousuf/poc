import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box>
      <Typography variant='h5' align='center' paragraph>
        Sorry Page Not Found
      </Typography>
      <Typography align='center'>
        The page you are looking for is not available.
        <Link to='/'>
          <Typography color='primary' component='span'>
            Go Back
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
}
