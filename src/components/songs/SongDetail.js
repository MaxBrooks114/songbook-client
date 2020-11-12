import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSong } from '../../actions/songs';
import { playSong, playElement } from '../../actions/spotify';
import {renderBool, audioFeaturesToText, millisToMinutesAndSeconds, renderText} from '../../helpers/detailHelpers'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import modes from './modes';
import keys from './keys';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import Grid from '@material-ui/core/Grid';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.light,
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    position: 'sticky',
    marginTop: 11,
    marginBottom: '3rem',
  },

  lyrics: {
    textTransform: 'none',
  },

  media: {
    backgroundSize: 'stretch',
    borderRadius: '8px',
    border: `1px solid ${theme.palette.common.pastelPurple}`,
    padding: '5px',
  },
  details: {
    color: 'white',
    paddingTop: theme.spacing(2),
  },

  accordion: {
    background: theme.palette.primary.light,
    color: 'white',
  },

  buttonContainer: {
    marginTop: theme.spacing(2),
    margin: theme.spacing(1),
  },

  delete: {
    background: `linear-gradient(360deg, ${theme.palette.error.light} 0%,  ${theme.palette.error.main} 80%)`,
    '&:hover': {
      background: 'rgba(8,199,251,1)',
      color: 'rgba(86,3,114,1)',
      display: 'absolute',
    },
  },

  button: {
    background: 'linear-gradient(360deg, rgb(254,182,48,1) 0%,  rgb(254,123,235, 1) 80%)',
    '&:hover': {
      background: 'rgba(8,199,251,1)',
      color: 'rgba(86,3,114,1)',
    },
    textDecoration: 'none',
  },

  link: {
    textDecoration: 'none',
  },

  cardContent: {
    flex: '1 0',
  },

  songTitle: {
    fontWeight: 'bold',
    textShadow: '-1px -1px 0 #000',
  },
}));

const SongDetail = ({ song }) => {
  const dispatch = useDispatch();
  const deviceId = useSelector((state) => state.auth.user.spotify_info.device_id);
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token);
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token);
  const user = useSelector((state) => state.auth.user);
  const elements = useSelector((state) =>
    Object.values(state.elements).filter((element) => song.elements.includes(element.id))
  );
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  
  const renderSpotifyOption = (mediaType) => {
    const playerFunction = mediaType === 'song' ? handleSongPlayClick : handleElementPlayClick

    return accessToken && accessToken !== "" ?
      <Button onClick={playerFunction}>Play it</Button> : <a href={`http://localhost:8000/api/spotify/login/${user.id}`}>Integrate with your Spotify Premium Account to use the play song feature!</a>
  }
  


  const renderElements = (elements) => {
    return elements
      ? elements.map((element) => {
          return (
            <>
              <AccordionDetails>
                <Typography>
                  <Link to={`/elements/${element.id}`}>{element.name} of {element.song.title}</Link>
                  </Typography>
                {renderSpotifyOption()}
              </AccordionDetails>
            </>
          );
        })
      : null;
  };

  const handleSongPlayClick = () => {
    dispatch(playSong(accessToken, song.spotify_url, refreshToken, deviceId));
  };
  
  const handleElementPlayClick = (element) => {
    dispatch(playElement(accessToken, element.song.spotify_url, refreshToken, element.start, deviceId));
  };

  return song ? (
    <Slide direction="up" mountOnEnter unmountOnExit in transition={150}>
      <Paper className={classes.root} elevation={3}>
        <Grid container justify="space-evenly" className={classes.details}>
          <Grid item xs={4}>
            <Typography>Title: {song.title}</Typography>
            <Typography>Artist: {song.artist}</Typography>
            <Typography>Album: {song.album}</Typography>
            <Typography>Release Date: {song.year}</Typography>
            <Typography>Genre: {song.genre}</Typography>
            <Typography>Tempo: {song.tempo} BPM</Typography>
            <Typography>Key: {renderText(keys, song.key)}</Typography>
            <Typography>Mode: {renderText(modes, song.mode)}</Typography>
            <Typography>Time Signature: {song.time_signature}/4</Typography>
            <Typography>Duration: {millisToMinutesAndSeconds(song.duration)}</Typography>
            <Typography>Original?: {renderBool(song.original)}</Typography>
            <Typography>Explicit?: {renderBool(song.explicit)}</Typography>
          </Grid>

          <Grid item xs={5}>
            <img
              alt={song.album}
              className={classes.media}
              src={song.image ? song.image : 'https://coverfiles.alphacoders.com/796/79685.jpg'}
            />
          </Grid>
          <Grid item xs={12}>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Song Features</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Acousticness: {audioFeaturesToText(song.acousticness)}</Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography>Danceability: {audioFeaturesToText(song.danceability)}</Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography>Energy: {audioFeaturesToText(song.energy)}</Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography>Instrumentalness: {audioFeaturesToText(song.instrumentalness)}</Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography>Liveness: {audioFeaturesToText(song.liveness)}</Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography>Loudness: {song.loudness}</Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography>Speechiness: {audioFeaturesToText(song.speechiness)}</Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography>Valence: {audioFeaturesToText(song.valence)}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Lyrics</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.lyrics}>{song.lyrics}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Elements</Typography>
              </AccordionSummary>
              {renderElements(elements)}
            </Accordion>
          </Grid>
          <Grid container justify="space-between" className={classes.buttonContainer}>
            <Link className={classes.link} to={`edit/${song.id}`}>
              <Button className={classes.button}>Edit </Button>
            </Link>
              {renderSpotifyOption('song')}

            <Button className={classes.delete} onClick={handleClickOpen}>
              Delete
            </Button>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this song?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              By deleting this song you will also delete all affiliated elements.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button
              onClick={() => {
                handleClose();
                dispatch(deleteSong(song.id, song));
              }}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Slide>
  ) : null;
};

export default SongDetail;
