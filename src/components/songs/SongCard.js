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
    background: theme.palette.primary.light,
    display: 'flex',
    width: '97%',
    height: 'auto',
    boxShadow: theme.shadows[24],
    '&:hover': {
      cursor: 'pointer',
    },
    color: '#FFF',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
  
    },
    [theme.breakpoints.down('md')]: {
      width: '100%'
  
    },
  },
  media: {
    width: 85,
    objectFit: 'contain',
    [theme.breakpoints.down('md')]: {
      width: 0
  
    },
    [theme.breakpoints.down('sm')]: {
      width: 85,
       objectFit: 'contain',
    },
  },
}));

const SongCard = ({ song, transitionDuration, handleClick }) => {
  const classes = useStyles();
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Slide direction="up" mountOnEnter in timeout={transitionDuration}>
      <Card className={classes.root} onClick={() => handleClick(song.id)}>
        <CardMedia
          className={classes.media}
          image={song.image ? song.image : 'https://coverfiles.alphacoders.com/796/79685.jpg'}
        />

        <CardContent className={classes.cardContent}>
          <Typography variant={matches ? "caption" : "subtitle2"}>{song.title}</Typography>< br/>
          <Typography variant={matches ? "caption" : "subtitle2"}>{song.artist}</Typography>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default SongCard;
