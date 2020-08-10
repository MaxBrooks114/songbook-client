import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSong } from '../../actions/songs';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import modes from './modes';
import keys from './keys';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.light,
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    position: 'sticky',
    width: '98.5%',
    marginTop: 11,
    marginBottom: '3em',
  },

  media: {
    width: 151,
    backgroundSize: 'cover',
  },
  details: {
    color: 'black',
    marginLeft: 2,
  },

  accordion: {
    background: theme.palette.primary.light,
    color: 'black',
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
  },

  cardContent: {
    flex: '1 0',
  },

  songTitle: {
    fontWeight: 'bold',
    textShadow: '-1px -1px 0 rgb(254,123,235, 1)',
  },
}));

const SongDetail = ({ song }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const renderBool = (bool) => {
    return song.bool ? 'Yes' : 'No';
  };

  const renderText = (list, v) => {
    return v || v === 0 ? list.find((k) => k[v])[v] : null;
  };

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  const audioFeaturesToText = (feature) => {
    switch (true) {
      case feature === null:
        return 'N/A';

      case feature <= 0.35:
        return 'low';

      case feature > 0.35 && feature <= 0.7:
        return 'medium';

      case feature > 0.7:
        return 'high';

      default:
        return 'N/A';
    }
  };

  return song ? (
    <Slide direction="up" mountOnEnter unmountOnExit in transition={150}>
      <Paper variant="outlined" className={classes.root} elevation={3}>
        <div className={classes.details}>
          <Typography>{song.title}</Typography>
          <Typography>{song.artist}</Typography>
          <Typography>{song.album}</Typography>
          <Typography>{song.year}</Typography>
          <Typography>Genre: {song.genre}</Typography>
          <Typography>Tempo: {song.tempo} BPM</Typography>
          <Typography>Key: {renderText(keys, song.key)}</Typography>
          <Typography>Mode: {renderText(modes, song.mode)}</Typography>
          <Typography>Time Signature: {song.time_signature}/4</Typography>
          <Typography>Duration: {millisToMinutesAndSeconds(song.duration)}</Typography>
          <Typography>Original?: {renderBool(song.original)}</Typography>
          <Typography>Explicit?: {renderBool(song.explicit)}</Typography>
          <Accordion className={classes.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Song Features</Typography>
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
              <Typography>Valence: {audioFeaturesToText(song.loudness)}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Lyrics</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{song.lyrics}</Typography>
            </AccordionDetails>
          </Accordion>

          <Button className={classes.delete} onClick={() => dispatch(deleteSong(song.id))}>
            Delete
          </Button>

          <Link to={`edit/${song.id}`}>
            <Button className={classes.button}>Edit </Button>
          </Link>
        </div>
      </Paper>
    </Slide>
  ) : null;
};

export default SongDetail;
