import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    display: 'flex',
    width: '95%',
    height: 85,
    paddingTop: 0,
    paddingBottom: 0,
    color: theme.palette.info.main,
    [theme.breakpoints.down('xs')]: {
      width: '100%'
  
    },
    [theme.breakpoints.down('md')]: {
      width: '100%'
  
    },
  

  },

  cardContent: {
    marginTop: 'auto',
    marginLeft: '.6rem'
  },

  media: {
    width: 85,
    height: 85,
    objectFit: 'fill',
    borderRadius: '4px',
    [theme.breakpoints.down('md')]: {
      width: 0
  
    },
    [theme.breakpoints.down('sm')]: {
      width: 85,
       objectFit: 'contain',
    },
  },
}));

const SongCard = ({ song, transitionDuration, fullDisplay, handleClick }) => {
  const classes = useStyles();
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  

  return (
    <Slide direction="up" mountOnEnter in timeout={transitionDuration}>
      <Card style={fullDisplay ? {margin: 'auto'}: null} className={classes.root} onClick={() => handleClick(song.id)}>
        <CardMedia>
           <img
                  alt={song.album}
                  className={classes.media}
                  src={song.image ? song.image : 'https://coverfiles.alphacoders.com/796/79685.jpg'}
                />   
      
        </CardMedia>
        <CardContent className={classes.cardContent}>
          <Typography component="p" style={{fontWeight: '600', verticalAlign: 'middle'}} variant={matches ? "caption" : "subtitle2"}>
            {song.title} 
          </Typography>
          <Typography style={{fontWeight: '400'}} variant="caption">
            {song.artist}
          </Typography>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default SongCard;
