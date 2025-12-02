import { useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import HideImageIcon from '@mui/icons-material/HideImage';
import ImageList from '@mui/material/ImageList';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ImageListItem from '@mui/material/ImageListItem';

import { cropString } from '../../helpers';

interface Props {
  title: string;
  subtitle?: string;
  images?: string[];
}

export const ProjectItem = ({ title, subtitle, images = [] }: Props) => {
  const cropSubtitle = useMemo(() => {
    if (subtitle) {
      return cropString(subtitle, 400);
    }
  }, [subtitle]);

  const imageLimit = images.length >= 4 ? 4 : images.length;

  const columns = useMemo(() => {
    return imageLimit % 2 === 0 ? 2 : 3;
  }, [imageLimit]);

  return (
    <ListItemButton
      alignItems="flex-start"
      disableRipple
      divider
      sx={{ gap: 2 }}
    >
      {/* It create a image grid for project images */}
      <ListItemAvatar>
        <Avatar
          sx={{ width: 200, height: 200, backgroundColor: 'lightgray' }}
          variant="rounded"
        >
          {imageLimit === 0 ? (
            <Stack sx={{ alignItems: 'center' }}>
              <HideImageIcon sx={{ fontSize: 50 }} />
              <Typography sx={{ fontSize: 20 }}>Sin imágenes</Typography>
            </Stack>
          ) : (
            <ImageList
              cols={columns}
              gap={0}
              sx={{ height: '100%', overflow: 'hidden' }}
            >
              {images.slice(0, imageLimit).map((image, i) => (
                <ImageListItem key={image}>
                  <img
                    alt={`Imagen ${i + 1} del proyecto ${title}`}
                    loading="lazy"
                    src={image}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={title}
        secondary={cropSubtitle || 'Sin descripción'}
        slotProps={{ primary: { sx: { marginBottom: 1, fontSize: 25 } } }}
      />
    </ListItemButton>
  );
};
