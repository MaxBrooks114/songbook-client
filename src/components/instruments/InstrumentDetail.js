import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInstrument } from '../../actions/instruments';
import {playElement} from '../../actions/spotify'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
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
    marginBottom: '3em',
  },

  details: {
    color: 'white',
    paddingTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },

  accordion: {
    background: theme.palette.primary.light,
    color: 'white',
  },

  buttonContainer: {
    paddingBottom: theme.spacing(2),
    margin: theme.spacing(2),
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

const InstrumentDetail = ({ instrument }) => {
  const dispatch = useDispatch();
  const deviceId = useSelector((state) => state.auth.user.spotify_info.device_id);
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token);
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token);

  const handleElementPlayClick = (element) => {
    dispatch(playElement(accessToken, element.song.spotify_url, refreshToken, element.start, deviceId));
  };

  const renderElements = (elements) => {
    return elements
      ? elements.map((element) => {
          return (
            <>
              <AccordionDetails>
                <Typography>
                  <Link to={`/elements/${element.id}`}>{element.name} of {element.song.title}</Link>
                  
                </Typography>
                <Button onClick={() => handleElementPlayClick(element)}>Hear This Element</Button> <br />
              </AccordionDetails>
            </>
          );
        })
      : null;
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const elements = useSelector((state) =>
  Object.values(state.elements).filter((element) => instrument.elements.includes(element.id))
);

  const classes = useStyles();

  return instrument ? (
    <Slide direction="up" mountOnEnter unmountOnExit in transition={150}>
      <Paper className={classes.root} elevation={3}>
        <Grid container className={classes.details}>
          <Grid item xs={12}>
            <Typography>Title: {instrument.name}</Typography>
            <Typography>Make: {instrument.make}</Typography>
            <Typography>Model: {instrument.model}</Typography>
            <Typography>Year: {instrument.year}</Typography>
            <Typography>Family: {instrument.family}</Typography>
            <Typography>Tonality: {instrument.tonal_range}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Elements</Typography>
              </AccordionSummary>
              {renderElements(elements)}
            </Accordion>
          </Grid>
        </Grid>
        <Grid container justify="space-evenly" className={classes.buttonContainer}>
          <Link className={classes.link} to={`edit/${instrument.id}`}>
            <Button className={classes.button}>Edit </Button>
          </Link>

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
          <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this Instrument?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              By deleting this isntrument you will also lose any affiliation with the elements you have listed for this
              instrument.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button
              onClick={() => {
                handleClose();
                dispatch(deleteInstrument(instrument.id));
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

export default InstrumentDetail;
