import React from 'react';
import {NoSsr} from '@mui/base';
import { makeStyles, Box, Card, CardMedia } from '@mui/material';
import GoogleFont from 'react-google-fonts'

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: '1rem',
    boxShadow: 'none',
    position: 'relative',
    minWidth: 200,
    minHeight: 360,
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '64%',
      bottom: 0,
      zIndex: 1,
      background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
    },
  },
  content: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    width: '100%',
  },
}));

export const GalaxyCardDemo = React.memo(function GalaxyCard() {
  const styles = {useStyles};
  return (
    <>
        <NoSsr><h1>Galaxy Card</h1>
        <GoogleFont href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,500&display=swap' />
        <GoogleFont href='https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;700&display=swap' />
        <GoogleFont href='https://fonts.googleapis.com/css2?family=Spartan:wght@200;400;700&display=swap' />
        <GoogleFont href='https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;500&display=swap' />
        </NoSsr>
      
      <Card classes={useStyles}>
        <CardMedia
          classes={useStyles}
          image={
            'https://image-us.samsung.com/SamsungUS/home/audio/galaxy-buds/MB-04-JustWhatYouWantV4.jpg?$cm-g-fb-full-bleed-img-mobile-jpg$'
          }
        />
        <Box py={3} px={2} >
          
        </Box>
      </Card>
    </>
  );
});
export default GalaxyCardDemo