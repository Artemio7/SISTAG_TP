import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';

interface Props {
  images?: (string | undefined)[];
}

export const ImageGallery = ({ images = [] }: Props) => {
  return images.length > 0 ? (
    <ImageList
      sx={{ width: '100%', height: 500 }}
      cols={4}
      rowHeight={240}
      gap={5}
    >
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            src={image}
            alt="Una imagen en la galería"
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 8,
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  ) : (
    <Box
      sx={{
        width: '100%',
        height: 500,
        bgcolor: grey[200],
        borderRadius: 5,
        mt: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="subtitle1">Añade imagenes a tu proyecto</Typography>
    </Box>
  );
};
