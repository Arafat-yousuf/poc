import { Box, Button, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import exifr from 'exifr';
import { useState } from 'react';
import { getFilesHandler } from '../../api/handlers/user.api.handler';
import { GDriveResponse } from '../../models/gdrive.response';

export default function Test() {
  const [imageFiles, setImageFiles] = useState<GDriveResponse[]>([]);
  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const val = await exifr.parse(file);
      console.log(val);
    }
  };

  const handleClick = async () => {
    const files = await getFilesHandler();
    console.log(files.data);
    setImageFiles(files.data);
  };
  return (
    <Box>
      <Button variant='contained' component='label'>
        Upload
        <input hidden type='file' onChange={handleFileInputChange} accept='image/*' />
      </Button>
      <Button onClick={handleClick} variant='contained' component='label'>
        List
      </Button>
      <Grid container>
        {imageFiles.length > 0 &&
          imageFiles.map((imageFile, index) => (
            <Grid key={index} item m={2}>
              <Card sx={{ maxWidth: 260 }}>
                <CardMedia sx={{ height: 195 }} image={`https://drive.google.com/thumbnail?id=${imageFile.id}`} title={imageFile.name} />
                <CardContent>
                  <Typography variant='body2' color='text.secondary'>
                    {imageFile.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
