import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import { importSpotifyTrack } from '../../actions/spotify';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    color: 'black',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[24],
  },
  media: {
    height: 200,
    objectFit: "fill",
    width: '100%',
  },
  title: {
    
  },

  button: {
    color: theme.palette.primary.dark,
    background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%,  ${theme.palette.info.main} 150%)`,
    width: '100%',
    '&:hover': {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.dark,
    },
  },

  cardContent: {
    flexGrow: 1,
    color: 'white',
  },

  trackTitle: {
    fontWeight: 'bold',
    color: 'white',
  },
}));

const SpotifyTrack = ({ track, transitionDuration }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Slide direction="up" mountOnEnter in timeout={transitionDuration}>
      <Card className={classes.root}>
        <CardMedia
          
          // title={track.album.name}
          // pic={track.album.images.length > 0 ? track.album.images[0].url : null}
        ><img className={classes.media} alt={track.album.name} src={track.album.images.length > 0 ? track.album.images[0].url : null}/></CardMedia>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.trackTitle} gutterBottom variant="h5">
            {track.name}
          </Typography>
          <Typography >{track.artists[0].name}</Typography>
          <Typography>
            {track.album.name}, {track.album.release_date}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            size="small"
            variant="contained"
            onClick={() => dispatch(importSpotifyTrack(track.id))}
          >
            Import Song
          </Button>
        </CardActions>
      </Card>
    </Slide>
  );
};

export default SpotifyTrack;
