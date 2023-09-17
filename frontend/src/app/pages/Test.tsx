import { Box, Button, ButtonGroup, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import exifr from 'exifr';
import { useState } from 'react';
import { getFilesHandler, getStartPageTokenHandler, syncChangesHandler } from '../../api/handlers/storage.api.handler';
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

  const handleClickList = async () => {
    const files = await getFilesHandler();
    console.log(files.data);
    setImageFiles(files.data);
  };

  const handleClickgetToken = async () => {
    const response = await getStartPageTokenHandler();
    console.log(response);
  };

  const handleSyncChanges = async () => {
    const response = await syncChangesHandler();
    console.log(response);
  };
  return (
    <Box>
      <Button sx={{ mx: 2 }} variant='contained' component='label'>
        Upload
        <input hidden type='file' onChange={handleFileInputChange} accept='image/*' />
      </Button>
      <Button sx={{ mx: 2 }} onClick={handleClickList} variant='contained' component='label'>
        List
      </Button>
      <Button sx={{ mx: 2 }} onClick={handleClickgetToken} variant='contained' component='label'>
        GetToken
      </Button>
      <Button sx={{ mx: 2 }} onClick={handleSyncChanges} variant='contained' component='label'>
        Sync
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
