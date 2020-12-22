import React, {useState} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as workerTimers from 'worker-timers'
import { deleteSection } from '../../actions/sections';
import { playSection } from '../../actions/spotify';
import {renderText, millisToMinutesAndSeconds, renderBool} from '../../helpers/detailHelpers'
import {deleteFile} from '../../actions/files'
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
import Divider from '@material-ui/core/Divider';
import Metronome from '@kevinorriss/react-metronome'
import { Link } from 'react-router-dom';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import Player from './Player';
import RecordView from '../RecordView'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import './metronome.css'


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    position: 'sticky',
    marginTop: 11,
    marginBottom: '3em',
  },

  lyrics: {
    textTransform: 'none',
  },

  details: {
    color: theme.palette.info.main,
    paddingTop: theme.spacing(2),
  },

  accordion: {
    background: theme.palette.primary.main,
    color: theme.palette.info.main,
    '& .MuiAccordionSummary-content': {
      flexGrow: 0,
    },

    '& .MuiAccordionSummary-root': {
      justifyContent: 'center',
      padding: 0
    },

    '& .MuiAccordionDetails-root': {
      padding: 0,
      marginBottom: theme.spacing(2)
    },  

    '& .MuiGrid-grid-xs-10': {
      margin: 0,
      justifyContent: 'center'
    }
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },

   dialog: {
    '& .MuiDialog-paper': {
      background: theme.palette.primary.main
    },

    '& .MuiTypography-root':{
      color: theme.palette.info.main
    },

    '& .MuiButton-textPrimary':{
      color: theme.palette.info.main
    },

    
  },


 deleteChoice: {
      color: theme.palette.primary.main,
      background: `linear-gradient(90deg, ${theme.palette.common.red} 0%,  ${theme.palette.info.main} 150%)`,
      '&:hover': {
        background: theme.palette.common.red,
        color: theme.palette.primary.main,
      },

    },

  divider: {
    ...theme.divider,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },

  verticalDivider: {
    ...theme.divider,
    height: '60px'
    
  },

   menu: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.info.main,

  },

  menuItem: {
    ...theme.typography.tab,
    '& .MuiMenuItem-root': {
      justifyContent: 'center',
    }
  },

  playButton: {
    color: theme.palette.secondary.main
  },

  bigPlayButton: {
      color: theme.palette.secondary.main,
      height: '120px',
      width: '120px',
     
      
  }, 

  bigPlayButtonContainer : {
   
  },

  deleteRecordingButton: {
      
    height: '64px',
    width: '64px',
    color: theme.palette.common.red,
    border: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
          height: '32px',
          width: '32px'
      },
  },

  buttonContainer: {
    marginTop: theme.spacing(2),
    margin: theme.spacing(1),
  },

  metronome: {
    width: '80%'
  },

  link: {
    textDecoration: 'none',
    color: theme.palette.info.main
  },

  cardContent: {
    flex: '1 0',
  },

  songTitle: {
    fontWeight: 'bold',
    textShadow: '-1px -1px 0 #000',
  },

   sheetmusic: {
    height: '640px',
    width: '520px',
    [theme.breakpoints.down('sm')]: {
          height: '320px',
          width: '260px'
      },
  }
}));

const SectionDetail = ({ section }) => {
  const dispatch = useDispatch();
  const deviceId = useSelector((state) => state.auth.user.spotify_info.device_id, shallowEqual);
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token, shallowEqual);
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token, shallowEqual);
  const instruments = useSelector((state) =>
  Object.values(state.instruments).filter((instrument) => section.instruments.includes(instrument.id)), shallowEqual
);
  const files = useSelector((state) => state.files)
  const recordings = Object.values(files).filter(file => (file.extension === 'wav' || file.extension === 'mp3') && file.section === section.id )
  const tabs = Object.values(files).filter(file => (file.extension === 'pdf' || file.extension === 'png' || file.extension === 'jpeg') && file.section === section.id )
  const user = useSelector((state) => state.auth.user, shallowEqual);

  const [open, setOpen] = useState(false);

  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const popped = Boolean(anchorEl);
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

     const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
 
 


const renderSpotifyOption = () => {
    return accessToken && accessToken !== "" ?
     <IconButton className={classes.bigPlayButtonContainer} onClick={handleSectionPlayClick}><PlayCircleOutlineRoundedIcon className={classes.bigPlayButton}  /></IconButton> : <a href={`http://http://localhost:8000/api/spotify/login/${user.id}`}>Integrate with your Spotify Premium Account to use the play song feature!</a>
  }
  const renderInstruments = (instruments) => {
    return instruments
      ? instruments.map((instrument) => {
          return (
            <>
              <AccordionDetails>
                <Typography></Typography>
                <Link className={classes.link} to={`/instruments/${instrument.id}`}>{instrument.name}</Link>
              </AccordionDetails>
            </>
          );
        })
      : null;
  };
 
  const renderRecordings = () => {
   return recordings.map(recording => {
      return (
        <Grid container alignItems="center" justify="space-around">
          <Grid item xs={10}>
              <Player  src={recording.file}/>
          </Grid>
          <Grid item>
            <IconButton>
            <DeleteForeverRoundedIcon className={classes.deleteRecordingButton} onClick={() => dispatch(deleteFile(recording.id))}/></IconButton>
          </Grid>
        </Grid>
      )
    })
  }

  const renderTabs = () => {
  return tabs.map(tab => {
    let name = tab.file.split('/').slice(-2).join('')
    return (
      
        <Accordion className={classes.accordion}>        
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography variant={matches ? "caption" : "subtitle1" }>{name}</Typography>
              </AccordionSummary>
              <Grid container alignItems="center" justify="space-around">
                <Grid item xs={12}>
                  <AccordionDetails>
                    <Grid container justify="space-around">
                      <Grid item xs={10}>
                        <img className={classes.sheetmusic} alt={name} src={tab.file}/>
                      </Grid>
                      <Grid item>
                          <IconButton>
                          <DeleteForeverRoundedIcon className={classes.deleteRecordingButton} onClick={() => dispatch(deleteFile(tab.id))}/></IconButton>
                      </Grid>
                    </Grid>
                  </AccordionDetails>   
              </Grid>
          </Grid>
        </Accordion>
  )
    })
  }
  const handleSectionPlayClick = () => {
    setShow(true)
    const timeout = workerTimers.setTimeout(() => {
      dispatch(playSection(accessToken, section.song.spotify_url, refreshToken, section.start, section.duration, deviceId))
      setShow(false)  
      workerTimers.clearTimeout(timeout)
    }, 3000);
    
  };


  return section ? (
    <Slide direction="up" mountOnEnter unmountOnExit in transition={150}>
      
      <Paper className={classes.root} elevation={3}>
        <BackDrop className={classes.backdrop} count={4} show={show}/>
        <Grid container alignItems="center" className={classes.details}>
          <Grid item xs={12}>
            <Grid container align="right" justify="flex-end">
              <Grid item xs={2} lg={1}>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleMenuClick(event)}
                > <MoreVertRoundedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="space-evenly" align={matches ? "center" : 'left'} alignItems="center">
              <Grid item xs={12} lg={4}>
                <Typography  variant={matches ? "h5" : "h4"} >
                  {section.name}
                </Typography>
                <Typography variant={matches ? "subtitle1" : "h6"}>
                  <Link to={`/songs/${section.song.id}`}>{section.song.title}</Link>
                </Typography>
              </Grid>
              <Grid item xs={12} lg={4}>
                 {renderSpotifyOption()}
              </Grid>
            </Grid>
             <Grid item xs={12}>
                <Divider  variant="middle" className={classes.divider} />
              </Grid>
              <Grid item xs={12}>
            <Grid container align="center" alignItems="center" justify="space-evenly">
              <Grid item xs={3} lg={3}>
                <Typography variant={matches ? "caption" : "subtitle1" }>Start: {millisToMinutesAndSeconds(section.start)}</Typography> <br/ >
                <Typography variant={matches ? "caption" : "subtitle1" }>Duration: {millisToMinutesAndSeconds(section.duration)}</Typography>
              </Grid>
              <Grid item xs={1} lg={0}>
                <Divider orientation="vertical"  className={classes.verticalDivider} />
              </Grid>
              <Grid item xs={3} lg={3}>
                <Typography variant={matches ? "caption" : "subtitle1" }>{renderText(keys, section.key)} {renderText(modes, section.mode)}</Typography><br/ >
                <Typography variant={matches ? "caption" : "subtitle1" }>Learned?: {renderBool(section.learned)}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Divider orientation="vertical"  className={classes.verticalDivider} />
              </Grid>
              <Grid item xs={4} lg={3}>
                <Typography variant={matches ? "caption" : "subtitle1" }>{section.tempo} BPM</Typography><br/ >
                <Typography variant={matches ? "caption" : "subtitle1" }>Meter: {section.time_signature}/4</Typography>
              </Grid>
              {matches ? 
               <Grid item xs={10}>
                <Divider orientation="horizontal"  className={classes.divider} />
              </Grid> : null}
            </Grid>
          </Grid>
          </Grid>
          <Grid item xs={12}>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Lyrics</Typography>
              </AccordionSummary>
              <Grid item xs={12}>
                  <AccordionDetails>
                    <Grid container justify="space-around">
                      <Grid item xs={10}>
                        <Typography className={classes.lyrics}>{section.lyrics}</Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>   
              </Grid>
            </Accordion>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Instruments</Typography>
              </AccordionSummary>
              <AccordionDetails>
               <Grid item xs={12}>
                 <Grid container align="center" justify="center">
                   {renderInstruments(instruments)}
                </Grid>
              </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Metronome</Typography>
              </AccordionSummary>
              <AccordionDetails>
               <Grid item xs={12}> 
                      <Metronome key={section.id} startBpm= {section.tempo}/>
               
              </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Record Yourself</Typography>
              </AccordionSummary>
              <AccordionDetails>
               <Grid item xs={12}> 
                  <RecordView className="recorder" key={section.id} />
              </Grid>
              </AccordionDetails>
            </Accordion>
             <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Recordings</Typography>
              </AccordionSummary>
               <AccordionDetails>
                <Grid item xs={12}> 
                    {renderRecordings()}    
                </Grid>   
                </AccordionDetails>
            </Accordion>
             <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Sheet Music/ Tabs</Typography>
              </AccordionSummary>
              <AccordionDetails>
                 <Grid item xs={12}> 
                  {renderTabs()}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >
          <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this section?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                  You will no longer have access to any of its data which includes any associated recordings and sheet music, you can always create it again.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button
              onClick={() => {
                handleClose();
                dispatch(deleteSection(section.id))
              }}
              color="primary"
              autoFocus
              className={classes.deleteChoice}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
          <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={popped}
                      onClose={handleMenuClose}
                      classes={{paper: classes.menu}}

                    >
                      
                        <MenuItem             
                            className={classes.menu}
                            onClick={handleMenuClose}>
                           <Link className={classes.link} to={`edit/${section.id}`}>Edit</Link>
                        </MenuItem>
                        <MenuItem 
                            className={classes.menu}
                            onClick={() => {handleMenuClose(); handleClickOpen();  }}>
                           Delete
                        </MenuItem>
                    </Menu>
     
       
      </Paper>
    </Slide>
  ) : null;
};

export default SectionDetail;
