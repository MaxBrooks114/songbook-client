import React, {useState} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as workerTimers from 'worker-timers'
import { deleteElement } from '../../actions/elements';
import { playElement } from '../../actions/spotify';
import {renderText, millisToMinutesAndSeconds, renderBool} from '../../helpers/detailHelpers'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import modes from '../songs/modes';
import keys from '../songs/keys';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import BackDrop from '../ui/BackDrop';
import Metronome from '@kevinorriss/react-metronome'
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.light,
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    position: 'sticky',
    marginTop: 11,
    marginBottom: '3em',
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

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
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

const ElementDetail = ({ element }) => {
  const dispatch = useDispatch();
  const deviceId = useSelector((state) => state.auth.user.spotify_info.device_id, shallowEqual);
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token, shallowEqual);
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token, shallowEqual);
  const instruments = useSelector((state) =>
  Object.values(state.instruments).filter((instrument) => element.instruments.includes(instrument.id)), shallowEqual
);
  const user = useSelector((state) => state.auth.user, shallowEqual);

  const [open, setOpen] = useState(false);

  const [show, setShow] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
 



const renderSpotifyOption = () => {
    return accessToken && accessToken !== "" ?
      <Button onClick={handleElementPlayClick}>Play it</Button> : <a href={`http://localhost:8000/api/spotify/login/${user.id}`}>Integrate with your Spotify Premium Account to use the play song feature!</a>
  }
  const renderInstruments = (instruments) => {
    return instruments
      ? instruments.map((instrument) => {
          return (
            <>
              <AccordionDetails>
                <Typography></Typography>
                <Link to={`/instruments/${instrument.id}`}>{instrument.name}</Link>
              </AccordionDetails>
            </>
          );
        })
      : null;
  };
 

  const handleElementPlayClick = () => {
    setShow(true)
    const timeout = workerTimers.setTimeout(() => {
      dispatch(playElement(accessToken, element.song.spotify_url, refreshToken, element.start, element.duration, deviceId))
      setShow(false)  
      workerTimers.clearTimeout(timeout)
    }, 3000);
    
  };


  return element ? (
    <Slide direction="up" mountOnEnter unmountOnExit in transition={150}>
      
      <Paper className={classes.root} elevation={3}>
        <BackDrop className={classes.backdrop} count={4} show={show}/>
        <Grid container className={classes.details}>
          <Grid item xs={4}>
            <Typography>
              Section: {element.name} of <Link to={`/songs/${element.song.id}`}>{element.song.title}</Link>
            </Typography>
            <Typography>Start: {millisToMinutesAndSeconds(element.start)}</Typography>
            <Typography>Duration: {millisToMinutesAndSeconds(element.duration)}</Typography>
            <Typography>Tempo: {element.tempo} BPM</Typography>
            <Typography>Key: {renderText(keys, element.key)}</Typography>
            <Typography>Mode: {renderText(modes, element.mode)}</Typography>
            <Typography>Time Signature: {element.time_signature}/4</Typography>
            <Typography>Learned?: {renderBool(element.learned)}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Lyrics</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.lyrics}>{element.lyrics}</Typography>
              </AccordionDetails>
            </Accordion> 
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Instruments</Typography>
              </AccordionSummary>
              {renderInstruments(instruments)}
            </Accordion>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Metronome</Typography>
              </AccordionSummary>
                <Metronome key={element.id} startBpm= {element.tempo}/>
            </Accordion>
          </Grid>
        </Grid>
        <Grid container justify="space-between" className={classes.buttonContainer}>
          <Link className={classes.link} to={`edit/${element.id}`}>
            <Button className={classes.button}>Edit </Button>
          </Link>
            {renderSpotifyOption()}
          <Button className={classes.delete} onClick={handleClickOpen}>
            Delete
          </Button>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this Element?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You will no longer have access to any of its data, you can always create it again.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button
              onClick={() => {
                handleClose();
                dispatch(deleteElement(element.id));
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

export default ElementDetail;
