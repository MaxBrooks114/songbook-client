import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInstrument } from '../../actions/instruments';
import {playSection } from '../../actions/spotify'
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
import { Link, useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';


const useStyles = makeStyles((theme) => ({
  root: {
  background: theme.palette.primary.main,
    transition: '.3s ease',
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    position: 'relative',
    marginBottom: '8rem',
    padding: 22
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

  accordionTitle:{
      fontWeight: '500'
  },

  buttonContainer: {
    paddingBottom: theme.spacing(2),
    margin: theme.spacing(2),
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

  deleteChoice: {
    color: theme.palette.common.orange,
  },



   menu: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.info.main,

  },

  menuItem: {
    ...theme.typography.tab,
    '& .MuiMenuItem-root': {
      justifyContent: 'center',
    }
  },

  playButton: {
    color: theme.palette.background.default
  },

 

  link: {
    textDecoration: 'none',
    color: theme.palette.info.main
  },


  songlink: {
    textDecoration: 'none',
    color: theme.palette.info.main,
    '&:hover': {
      color: theme.palette.info.main
    }
  }, 

  cardContent: {
    flex: '1 0',
  },

  songTitle: {
    fontWeight: 'bold',
   
  },

   vert: {
    padding: 0,
    position: 'absolute',
    right: 1,
    top: 3
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

const InstrumentDetail = ({ instrument, nextInstrument, prevInstrument, showDetail }) => {
  const dispatch = useDispatch();
  const deviceId = useSelector((state) => state.auth.user.spotify_info.device_id);
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token);
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token);
  const user = useSelector((state) => state.auth.user);
  const player = useSelector(state => state.spotifyPlayer)
  const loading = useSelector((state) => state.loading)
  const [open, setOpen] = React.useState(false);
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const popped = Boolean(anchorEl);
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const sections = useSelector((state) =>
    Object.values(state.sections).filter((section) => instrument.sections.includes(section.id))
  );

  const songs = sections.map(section => section.song)

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

  const handleSectionPlayClick = (section) => {
    dispatch(playSection(accessToken, section.song.spotify_url, refreshToken, section.start, section.duration, deviceId, section.id));
  };

  

   const renderSpotifyOptionSection = (section) => {
    if (accessToken && accessToken !== "" ) {
      if(loading.loading && section.id === player.sectionId ){
           return <IconButton><CircularProgress thickness={2.4} size={20} style={{color: 'white'}} /></IconButton>
      } else {
         return <IconButton  onClick={() => handleSectionPlayClick(section)}><PlayCircleOutlineRoundedIcon className={classes.playButton} /></IconButton> 
      }
    }
    
  }
  
  

  const renderSongs = (songs) => {
      
      return songs

      ? songs.map((song) => {
          let songSections = sections.filter(section => song.id === section.song.id )
          return (
               <Accordion className={classes.accordion}>        
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography variant={matches ? "caption" : "subtitle1" }> <Link className={classes.songlink} to={`/songs/${song.id}`}>{song.title}</Link></Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                      {renderSections(songSections)}
                  </AccordionDetails>
                </Accordion> 
          );
        })
      : null;
  }
  


  const renderSections = (sections) => {
    return sections
      ? sections.map((section) => {
          return (
            <Grid container justify="center" alignItems="center">
                <Typography>
                  <Link className={classes.songlink} to={`/sections/${section.id}`}>{section.name}</Link>
                  </Typography>
                {renderSpotifyOptionSection(section)}
            </Grid>
          );
        })
      : null;
  };


  const classes = useStyles();

  return instrument && showDetail ? (
    <Slide direction="up" mountOnEnter unmountOnExit in transition={150}>
      <Paper className={classes.root} elevation={3}>
        <Grid container alignItems="center" justify="center" className={classes.details}>
            <IconButton
                    className={classes.vert}
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) =>handleMenuClick(event)}
                > <MoreVertRoundedIcon />
            </IconButton>              
            <Grid item xs={12} className={classes.navRow}>
              <Grid container align='center' alignItems="center" justify="space-between">
                <Grid item xs={2}>
                  {prevInstrument ?
                    <IconButton
                        onClick={(event) =>  history.push(`/instruments/${instrument.id-1}`)}
                    > <SkipPreviousRoundedIcon  className={classes.prev} />
                    </IconButton> 
                  : null }
                </Grid>
                <Grid item xs ={8}>
                  <Typography variant={matches ? "h6" : "h5"} style={{display: 'inline', fontWeight: '600'}}>{instrument.name}</Typography>
                </Grid>
                <Grid item xs={2}>
                    {nextInstrument ? 
                      <IconButton
                          onClick={(event) =>  history.push(`/instruments/${instrument.id + 1}`)}
                      > <SkipNextRoundedIcon className={classes.next}/> 
                      </IconButton> : null}
                </Grid>
            </Grid> 
          </Grid>
          <Grid item xs={12}>

             <Accordion className={classes.accordion}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography className={classes.songTitle}>Instrument Info</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                     <Grid container alignItems="center">
                        <Grid item xs={2}/>
                        <Grid item xs={5}>
                          <Typography>Make: <span style={{fontSize: '.9rem'}}>{instrument.make}</span></Typography>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography>Model: <span style={{fontSize: '.9rem'}}>{instrument.model}</span></Typography>
                        </Grid>
                        <Grid item xs={2}/>
                        <Grid item xs={5}>
                          <Typography>Year: <span style={{fontSize: '.9rem'}}>{instrument.year}</span></Typography>
                        </Grid>                
                       <Grid item xs={5}>
                          <Typography>Family: <span style={{fontSize: '.9rem'}}>{instrument.family}</span></Typography>
                        </Grid>
                         <Grid item xs={2}/>
                        <Grid item xs={5}>
                          <Typography>Tonality: <span style={{fontSize: '.9rem'}}>{instrument.tonal_range}</span></Typography>
                        </Grid>
                      </Grid>
                  </AccordionDetails>        
                </Accordion>           
                </Grid>
            </Grid>
          <Grid item xs={12}>
            <Accordion className={classes.accordion} style={{marginBottom: 0}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Sections</Typography>
              </AccordionSummary>
              {renderSongs(songs)}  
            </Accordion>
          </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}

        >
          <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this Instrument?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              By deleting this instrument you will also lose any affiliation with the sections you have listed for this
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
                           <Link className={classes.link} to={`edit/${instrument.id}`}>Edit</Link>
                        </MenuItem>
                        <MenuItem 
                            className={classes.deleteChoice}
                            onClick={() => {handleMenuClose(); handleClickOpen();  }}>
                           Delete
                        </MenuItem>
                    </Menu>
      </Paper>
    </Slide>
  ) : null;
};

export default InstrumentDetail;
