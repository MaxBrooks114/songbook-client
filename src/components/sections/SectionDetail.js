import React, {useState} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as workerTimers from 'worker-timers'
import { deleteSection } from '../../actions/sections';
import { playSection, pressPausePlayer  } from '../../actions/spotify';
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
import Metronome from '@kevinorriss/react-metronome'
import { Link, useHistory } from 'react-router-dom';
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
import PauseCircleOutlineRoundedIcon from '@material-ui/icons/PauseCircleOutlineRounded';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    position: 'sticky',
    padding: 22,
    marginBottom: '8rem',
  },

  lyrics: {
    textTransform: 'none',
  },

  details: {
    color: theme.palette.info.main,
  },

  accordion: {
    background: theme.palette.primary.light,
    color: theme.palette.info.main,
    borderRadius: 4,
    margin: '1rem 0',
    '& .MuiAccordionSummary-content': {
      flexGrow: 0,
    },

    '& .MuiAccordionSummary-root': {
      justifyContent: 'space-between',
      padding: '0, 16'
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
      background: theme.palette.secondary.main
    },

    '& .MuiTypography-root':{
      color: theme.palette.info.main
    },

    '& .MuiButton-textPrimary':{
      color: theme.palette.info.main
    },

    
  },

   accordionTitle:{
      fontWeight: '500'
  },

 deleteChoice: {
       color: theme.palette.common.orange,
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

   media: {
    objectFit: 'fill',
    borderRadius: '4px',
    height: '100%',
    width: '100%',
    
  },

  playButton: {
    color: theme.palette.background.default
  },

  bigPlayButton: {
     color: theme.palette.background.default,
      height: '100%',
      width: '100%',
     
      
  }, 

  bigPlayButtonContainer : {
   position: 'absolute',
      top: '0',
      bottom: '4px',
      left: '0',
      right: '0',
      opacity: '.7',
      borderRadius: '4px',
      
      transition: '.3s ease',
      '&:hover':{
        background: theme.palette.info.main,
        opacity: '.6'
      },
  },

  bigPauseButtonContainer : {
      position: 'absolute',
      top: '0',
      bottom: '4px',
      left: '0',
      right: '0',
      opacity: '.6',
      borderRadius: '4px',   
      transition: '.3s ease',
      '&:hover':{
        background: theme.palette.info.main,
        
      },

  },

  buttonContainer: {
    marginTop: theme.spacing(2),
    margin: theme.spacing(1),
  },

  albumContainer: {
    position: 'relative',
  
  },

  deleteRecordingButton: {
      
    height: '48px',
    width: '48px',
    color: theme.palette.common.orange,
    border: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
          height: '32px',
          width: '32px'
      },
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

 
   sheetmusic: {
    height: '640px',
    width: '520px',
    [theme.breakpoints.down('sm')]: {
          height: '320px',
          width: '260px'
      },
  },

   title: {
      width: '95%',
      textAlign: 'center'
     
    },

  vert: {
    padding: 0,
    position: 'absolute',
    right: '1%',
    top: 22
  },
  close: {
    padding: 0,
    position: 'absolute',
    right: '4%',
    top: 22,
     [theme.breakpoints.down('sm')]: {
        right: '1%',
        top: 55 
      }, 
  },

 next: {
    padding: 0,
    height: 24,
    width: 24,
     [theme.breakpoints.down('sm')]: {
        
      }, 
  },
  prev: {
    padding: 0,
    height: 24,
    width: 24,
     [theme.breakpoints.down('sm')]: {
        
      }, 
  },

     navRow: {
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      borderRadius: 4,
    },

    spinnerContainer: {
      marginTop: '25%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }

}));

const SectionDetail = ({ section, nextSection, prevSection }) => {
  const dispatch = useDispatch();
  const deviceId = useSelector((state) => state.auth.user.spotify_info.device_id, shallowEqual);
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token, shallowEqual);
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token, shallowEqual);
  const instruments = useSelector((state) =>
  Object.values(state.instruments).filter((instrument) => section.instruments.includes(instrument.id)), shallowEqual
);
  const loading = useSelector((state) => state.loading)
  const player = useSelector(state => state.spotifyPlayer)
  const files = useSelector((state) => state.files)
  const recordings = Object.values(files).filter(file => (file.extension === 'wav' || file.extension === 'mp3') && file.section === section.id )
  const tabs = Object.values(files).filter(file => (file.extension === 'pdf' || file.extension === 'png' || file.extension === 'jpeg') && file.section === section.id )
  const user = useSelector((state) => state.auth.user, shallowEqual);

  const [open, setOpen] = useState(false);
  const history = useHistory()
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

  const handlePauseClick = () => {
    dispatch(pressPausePlayer(accessToken, refreshToken, deviceId, section.song.spotify_url))
  }

   const handleSectionPlayClick = () => {
    setShow(true)
    const timeout = workerTimers.setTimeout(() => {
      dispatch(playSection(accessToken, section.song.spotify_url, refreshToken, section.start, section.duration, deviceId, section.id))
      setShow(false)  
      workerTimers.clearTimeout(timeout)
    }, 3000);
    
  };


  const classes = useStyles();
 
 
  const sectionButton = player.playing && (player.songPlay || player.sectionPlay) && player.song === section.song.spotify_url && section.id === player.sectionId ?
   <IconButton className={classes.bigPauseButtonContainer} onClick={handlePauseClick}><PauseCircleOutlineRoundedIcon className={classes.bigPlayButton}  /></IconButton> : 
       <IconButton className={classes.bigPlayButtonContainer} onClick={handleSectionPlayClick}><PlayCircleOutlineRoundedIcon className={classes.bigPlayButton}  /></IconButton> 

const renderSpotifyOption = () => {
    if (accessToken && accessToken !== "") {
        if(loading.loading) {
            return <div className={classes.bigPlayButtonContainer}><div className={classes.spinnerContainer}><CircularProgress thickness={2.4} size={88} /></div></div>
      } else {
        return sectionButton
      }
    }
  }
  const renderInstruments = (instruments) => {
    return instruments
      ? instruments.map((instrument) => {
          return (
            <Grid item xs={2}>

                <Typography>
                  <Link className={classes.link} to={`/instruments/${instrument.id}`}>{instrument.name}</Link>
                </Typography>
             
            </Grid>
          );
        })
      : null;
  };
 
  const renderRecordings = () => {
   return recordings.map(recording => {
     let name = recording.file.split('/').slice(-2).join('')
      return (
       
         <Accordion className={classes.accordion} style={{ padding: 22}}>        
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography variant={matches ? "caption" : "subtitle1" }>{name}</Typography>
              </AccordionSummary>
              <Grid container alignItems="center" justify="space-around">
                <Grid item xs={12}>
                  <AccordionDetails>
                     <Grid item xs={10}>
                        <Player  src={recording.file}/>
                      </Grid>
                      <Grid item>
                        <IconButton>
                        <DeleteForeverRoundedIcon className={classes.deleteRecordingButton} onClick={() => dispatch(deleteFile(recording.id))}/></IconButton>
                      </Grid>
                  </AccordionDetails>   
              </Grid>
          </Grid>
        </Accordion>
      )
    })
  }

  const renderTabs = () => {
  return tabs.map(tab => {
    let name = tab.file.split('/').slice(-2).join('')
    return (
      
        <Accordion className={classes.accordion} style={{ padding: 22}}>        
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
 


  return section ? (
    <>
        <Slide direction="up" mountOnEnter unmountOnExit in transition={150}>
          <Paper className={classes.root} elevation={3}>
          <BackDrop className={classes.backdrop} count={4} show={show}/>
            <Grid container alignItems="center" className={classes.details}>
                <IconButton
                    className={classes.vert}
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleMenuClick(event)}
                > <MoreVertRoundedIcon />
                </IconButton>
                <Grid item xs={12}>
                  <Grid container justify="flex-start"  alignItems="center">
                    <Grid item xs={10} sm={8} md={6} lg={3} className={classes.albumContainer}>
                      {renderSpotifyOption()}
                      <img
                        alt={section.song.album}
                        className={classes.media}
                        src={section.song.image ? section.song.image : ''}
                      />
                    </Grid>   
                    <Grid item xs={1}/>
                    <Grid item xs={12} md={12} lg={7}>
                      <Typography  variant={matches ? "h5" : "h4"} >
                        {section.name} 
                      </Typography>
                      <Typography>
                        {millisToMinutesAndSeconds(section.start)}-{millisToMinutesAndSeconds(section.start+ section.duration)} ({millisToMinutesAndSeconds(section.duration)})
                      </Typography> 
                      <Typography variant={matches ? "subtitle1" : "h6"}>
                        <Link to={`/songs/${section.song.id}`}>{section.song.title}</Link>
                      </Typography>
                    </Grid>
                  </Grid>
                   <Grid item xs={3} className={classes.navRow}>
                    <Grid container justify="space-between">
                      <Grid item xs={2}>
                        {prevSection ?
                        <IconButton 
                            onClick={(event) =>  history.push(`/sections/${prevSection.id}`)}
                        > <SkipPreviousRoundedIcon  className={classes.prev} />
                        </IconButton> : null }
                      </Grid>
                        <Grid item xs={2} style={{marginRight: 18}}>
                          {nextSection ? 
                            <IconButton 
                                onClick={(event) =>  history.push(`/sections/${nextSection.id}`)}
                            > <SkipNextRoundedIcon className={classes.next}/> 
                            </IconButton> : null}
                        </Grid>
                    </Grid>
                  </Grid>
                  <Grid xs={12}>                   
                    <Accordion className={classes.accordion}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography className={classes.accordionTitle}>Section Features</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container alignItems="center">
                          <Grid item xs={2}/>
                          <Grid item xs={5}> 
                            <Typography variant={matches ? "caption" : "subtitle1" }>Key: <span style={{fontSize: '.9rem'}}>{renderText(keys, section.key)} {renderText(modes, section.mode)}</span></Typography> 
                          </Grid>                 
                          <Grid item xs={5}>
                            <Typography variant={matches ? "caption" : "subtitle1" }>Tempo:  <span style={{fontSize: '.9rem'}}>{section.tempo} BPM</span></Typography>
                          </Grid>
                            <Grid item xs={2}/>
                          <Grid item xs={5}>
                            <Typography variant={matches ? "caption" : "subtitle1" }>Meter: <span style={{fontSize: '.9rem'}}>{section.time_signature}/4</span></Typography>
                          </Grid>               
                       
                          <Grid item xs={5}>
                              <Typography variant={matches ? "caption" : "subtitle1" } >Learned: <span style={{fontSize: '.9rem'}}>{renderBool(section.learned)}</span></Typography>
                          </Grid>             
                        </Grid>
                      </AccordionDetails>
                    </Accordion>           
                  </Grid>  
                  <Grid item xs={12}>
                    <Accordion className={classes.accordion}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography className={classes.accordionTitle} >Lyrics</Typography>

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
                  </Grid>
                  <Grid item xs={12}>
                    <Accordion className={classes.accordion}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography className={classes.accordionTitle}>Instruments</Typography>
                      </AccordionSummary>
                      <Grid item xs={10}>
                      <AccordionDetails>
                        <Grid container align="center" justify="flex-start">
                          {renderInstruments(instruments)}
                        </Grid>
                      </AccordionDetails>
                      </Grid>
                    </Accordion>
                  </Grid>
                  <Accordion className={classes.accordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Typography className={classes.accordionTitle} >Metronome</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid item xs={12}> 
                        <Metronome key={section.id} startBpm= {section.tempo}/>
                      </Grid>
                    </AccordionDetails> 
                  </Accordion>
                  <Accordion className={classes.accordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Typography className={classes.accordionTitle}>Record Yourself</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid item xs={12}> 
                        <RecordView className="recorder" key={section.id} />
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className={classes.accordion}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Typography className={classes.accordionTitle}>Recordings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid item xs={12}> 
                        {renderRecordings()}    
                      </Grid>   
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className={classes.accordion} style={{marginBottom: 0}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Typography className={classes.accordionTitle}>Sheet Music/ Tabs</Typography>
                    </AccordionSummary>
                    <AccordionDetails >
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
              style={{color: theme.palette.common.orange}}
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
                            className={classes.menuItem}
                            onClick={handleMenuClose}>
                           <Link className={classes.link} to={`edit/${section.id}`}>Edit</Link>
                        </MenuItem>
                        <MenuItem 
                            className={classes.deleteChoice}
                            onClick={() => {handleMenuClose(); handleClickOpen();  }}>
                           Delete
                        </MenuItem>
                    </Menu>
      </Paper>
    </Slide>
    </>
  ) : null;
};

export default React.memo(SectionDetail);
