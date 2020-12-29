import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSong } from '../../actions/songs';
import { playSong, playSection, pressPausePlayer } from '../../actions/spotify';
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
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import PauseCircleOutlineRoundedIcon from '@material-ui/icons/PauseCircleOutlineRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    transition: '.3s ease',
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    position: 'relative',
    marginBottom: '8rem',
  },

  lyrics: {
    textTransform: 'none',

  },

  media: {
    objectFit: 'fill',
    borderRadius: '4px',
    height: '100%',
    width: '100%',
     [theme.breakpoints.down('md')]: {
          height: '500px',
          width: '500px',
    },
     [theme.breakpoints.down('sm')]: {
        height: '300px',
        width: '300px'
    },
     [theme.breakpoints.down('xs')]: {
        height: '220px',
        width: '220px'
    },
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
      justifyContent: 'flex-end',
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
      color: theme.palette.common.gray,
      height: '100%',
      width: '100%',
       
  }, 

  bigPlayButtonContainer : {
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      height: '99%',
      width: '100%',
      opacity: '0',
      borderRadius: '4px',
      
      transition: '.3s ease',
      '&:hover':{
        background: theme.palette.info.main,
        opacity: '.8'
      },
    },
  bigPauseButtonContainer : {
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      height: '99%',
      width: '100%',
      opacity: '.8',
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
    height: '100%',
    position: 'relative',

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
  },
}));

const SongDetail = ({ song }) => {
  const dispatch = useDispatch();
  const deviceId = useSelector((state) => state.auth.user.spotify_info.device_id);
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token);
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token);
  const user = useSelector((state) => state.auth.user);
  const player = useSelector(state => state.spotifyPlayer)
  const sections = useSelector((state) =>
    Object.values(state.sections).filter((section) => song.sections.includes(section.id))
  );
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const popped = Boolean(anchorEl);
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const songFeatureIcons = {
    'low': <MusicNoteRoundedIcon/>,
    'medium': <><MusicNoteRoundedIcon/><MusicNoteRoundedIcon/></>,
    'high': <><MusicNoteRoundedIcon/><MusicNoteRoundedIcon/><MusicNoteRoundedIcon/></>,

  }


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

  const handleSongPlayClick = () => {
    dispatch(playSong(accessToken, song.spotify_url, refreshToken, deviceId));
  };
  
  const handleSectionPlayClick = (section) => {
        dispatch(playSection(accessToken, song.spotify_url, refreshToken, section.start, section.duration, deviceId));
  };

  const handlePauseClick = () => {
    dispatch(pressPausePlayer(accessToken, refreshToken, deviceId, song.spotify_url))
  }

  const classes = useStyles();

  const songButton = player.playing && (player.songPlay || player.sectionPlay) && player.song === song.spotify_url ?
   <IconButton className={classes.bigPauseButtonContainer} onClick={handlePauseClick}><PauseCircleOutlineRoundedIcon className={classes.bigPlayButton}  /></IconButton> : 
       <IconButton className={classes.bigPlayButtonContainer} onClick={handleSongPlayClick}><PlayCircleOutlineRoundedIcon className={classes.bigPlayButton}  /></IconButton> 

  const renderSpotifyOptionSong = () => {
    return accessToken && accessToken !== "" ?
      songButton  : null
  }

  const renderSpotifyOptionSection = (section) => {
    return accessToken && accessToken !== "" ?
      <IconButton onClick={() => handleSectionPlayClick(section)}><PlayCircleOutlineRoundedIcon className={classes.playButton} /></IconButton> : null
  }
  
  


  const renderSections = (sections) => {
    return sections
      ? sections.map((section) => {
          return (
      
              <Grid item xs={6}>
                <Typography>
                  <Link className={classes.link} to={`/sections/${section.id}`}>{section.name}</Link>
                  {renderSpotifyOptionSection(section)}
                  </Typography>
              </Grid>
    
          );
        })
      : null;
  };



  return song ? (
    <>
    <Typography variant="h4">Details</Typography>
    <Slide  direction="up"  in transition={150}>
      
      <Paper className={classes.root} elevation={3}>
        <Grid container  alignItems="center" className={classes.details}>
          <Grid item style={{height: 0}} xs={12}>
            <Grid container align="right" justify="flex-end">
              <Grid item xs={2} lg={1}>
                <IconButton
                    style={{paddingTop: 0, paddingBottom: 0, paddingRight: '6px', paddingLeft: '6px' }}
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) =>handleMenuClick(event)}
                > <MoreVertRoundedIcon />
                </IconButton>
              
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="space-around" align={matches ? "center" : 'left'} alignItems="center">
              <Grid item xs={12} lg={6} className={classes.albumContainer}>
                {renderSpotifyOptionSong()}
                <img
                  alt={song.album}
                  className={classes.media}
                  src={song.image ? song.image : ''}
                />   
              </Grid>
              <Grid item xs={12} lg={4}>
                  <Typography variant={matches ? "h6" : "h5"}>{song.title}</Typography>
                  <Typography variant={matches ? "subtitle1" : "h6"}>{song.artist}</Typography>
                  <Typography variant={matches ? "subtitle1" : "h6"}>{song.album}</Typography>   
                  <Typography>{song.year}</Typography>
                  <Typography variant={matches ? "caption" : "subtitle1" }>{millisToMinutesAndSeconds(song.duration)}</ Typography> 
                  <Typography variant={matches ? "caption" : "subtitle1" }>{song.genre}</Typography>
                   <Typography variant={matches ? "caption" : "subtitle1" }>Key: {renderText(keys, song.key)} {renderText(modes, song.mode)}</Typography>
                  <Typography variant={matches ? "caption" : "subtitle1" }>{song.tempo} BPM</Typography>
                <Typography variant={matches ? "caption" : "subtitle1" }>Meter: {song.time_signature}/4</Typography>
                <Typography variant={matches ? "caption" : "subtitle1" } >Explicit?: {renderBool(song.explicit)}</Typography>
                 <Typography variant={matches ? "caption" : "subtitle1" }>Original?: {renderBool(song.original)}</Typography>
              </Grid>
            </Grid>
          </Grid>
          </Grid>
          <Grid item xs={12}>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Song Features</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Grid container alignItems="center">
                 <Grid item lg={2}/>
                <Grid item lg={5}>
                  <Typography variant={matches ? "caption" : "subtitle1" }> Acousticness: {songFeatureIcons[audioFeaturesToText(song.acousticness)]}</Typography>
                </Grid>
                <Grid item lg={5}> 
                  <Typography variant={matches ? "caption" : "subtitle1" }>Danceability: {songFeatureIcons[audioFeaturesToText(song.danceability)]}</Typography>
                </Grid>
                 
                  <Grid item lg={2}/>
                 <Grid item lg={5}>
                  <Typography variant={matches ? "caption" : "subtitle1" }>Energy: {songFeatureIcons[audioFeaturesToText(song.energy)]}</Typography>
                </Grid>
      
                <Grid item lg={5}>
                  <Typography variant={matches ? "caption" : "subtitle1" }>Instrumentalness: {songFeatureIcons[audioFeaturesToText(song.instrumentalness)]}</Typography>
                 </Grid>
                 
                  <Grid item lg={2}/>
                <Grid item lg={5}>
                  <Typography variant={matches ? "caption" : "subtitle1" }>Liveness: {songFeatureIcons[audioFeaturesToText(song.liveness)]}</Typography>
                </Grid>
                <Grid item lg={5}>
                <Typography variant={matches ? "caption" : "subtitle1" }>Loudness: {song.loudness}</Typography>
                 {matches ? <Divider orientation="horizontal"  className={classes.divider} /> : null}
                </Grid>
                 
                 <Grid item lg={2}/>
                 <Grid item lg={5}>
                <Typography variant={matches ? "caption" : "subtitle1" }>Speechiness: {songFeatureIcons[audioFeaturesToText(song.speechiness)]}</Typography>
                </Grid>
                <Grid item lg={5}>
                <Typography variant={matches ? "caption" : "subtitle1" }>Valence: {songFeatureIcons[audioFeaturesToText(song.valence)]}</Typography>
                 </Grid>
                  
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Lyrics</Typography>
              </AccordionSummary>
              <Grid item xs={12}>
                
                  <AccordionDetails>
                    <Grid container justify="space-around">
                      <Grid item xs={10}>
                        <Typography className={classes.lyrics}>{song.lyrics}</Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                  
              </Grid>
            </Accordion>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Sections</Typography>
              </AccordionSummary>
              <AccordionDetails>
               <Grid item xs={12}>
                 <Grid container align="center" justify="center">
                  {renderSections(sections)}
                </Grid>
              </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >
          <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this song?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              By deleting this song you will also delete all affiliated sections.
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
                           <Link className={classes.link} to={`edit/${song.id}`}>Edit</Link>
                        </MenuItem>
                        <MenuItem 
                            className={classes.menu}
                            onClick={() => {handleMenuClose(); handleClickOpen();  }}>
                           Delete
                        </MenuItem>
                    </Menu>
      </Paper>
    </Slide>
  </>
  ) : null;
};

export default SongDetail;
