import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInstrument } from '../../actions/instruments';
import {playSection} from '../../actions/spotify'
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
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    position: 'sticky',
    marginTop: 11,
    marginBottom: '3em',
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

  buttonContainer: {
    paddingBottom: theme.spacing(2),
    margin: theme.spacing(2),
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
    textShadow: '-1px -1px 0 #000',
  },
}));

const InstrumentDetail = ({ instrument }) => {
  const dispatch = useDispatch();
  const deviceId = useSelector((state) => state.auth.user.spotify_info.device_id);
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token);
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token);
  const user = useSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const popped = Boolean(anchorEl);
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = React.useState(false);
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
    dispatch(playSection(accessToken, section.song.spotify_url, refreshToken, section.start, deviceId));
  };

 const renderSpotifyOptionSection = (section) => {
    return accessToken && accessToken !== "" ?
      <IconButton onClick={() => handleSectionPlayClick(section)}><PlayCircleOutlineRoundedIcon className={classes.playButton} /></IconButton> : <a href={`http://http://localhost:8000/api/spotify/login/${user.id}`}>Integrate with your Spotify Premium Account to use the play song feature!</a>
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

  return instrument ? (
    <Slide direction="up" mountOnEnter unmountOnExit in transition={150}>
      <Paper className={classes.root} elevation={3}>
        <Grid container alignItems="center" className={classes.details}>
          <Grid item xs={12}>
             <Grid container align="right" justify="flex-end">
              <Grid item xs={2} lg={1}>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) =>handleMenuClick(event)}
                > <MoreVertRoundedIcon />
                </IconButton>
              
              </Grid>
            </Grid>
             <Grid item xs={12}>
                <Grid container justify="space-evenly" align="center" alignItems="center">
                    <Grid item xs={12}>
                      <Typography variant="h6">{instrument.name}</Typography>
                      <Divider  variant="middle" className={classes.divider} />
                    </Grid> 
                </Grid> 
              <Grid item xs={12}>
                  <Grid container align="left"  justify="space-around">
                        <Grid item>
                          <Typography>Make: {instrument.make}</Typography>
                          <Divider  variant="middle" className={classes.divider} style={{background: theme.palette.primary.main}} />
                          <Typography>Model: {instrument.model}</Typography>
                          <Divider  variant="middle" className={classes.divider} style={{background: theme.palette.primary.main}} />
                          <Typography>Year: {instrument.year}</Typography>

                        </Grid>
                        <Grid item>
                          <Typography>Family: {instrument.family}</Typography>
                          <Divider  variant="middle" className={classes.divider} style={{background: theme.palette.primary.main}} />
                          <Typography>Tonality: {instrument.tonal_range}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                </Grid>
            </Grid>
          <Grid item xs={12}>
            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.songTitle}>Sections</Typography>
              </AccordionSummary>
              {renderSongs(songs)}  
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
          <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this Instrument?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              By deleting this isntrument you will also lose any affiliation with the sections you have listed for this
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
                           <Link className={classes.link} to={`edit/${instrument.id}`}>Edit</Link>
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

export default InstrumentDetail;
