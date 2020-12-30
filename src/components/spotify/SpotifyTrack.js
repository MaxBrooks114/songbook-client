import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { importSpotifyTrack } from '../../actions/spotify';
import CloudDownloadRoundedIcon from '@material-ui/icons/CloudDownloadRounded';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.light,
    color: 'black',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[24],
    alignItems: 'flex-start',
    position: 'relative'
  },

  media: {
    height: '100%',
    objectFit: "contain",
    width: '100%',
  },
  

   link: {
    textDecoration: 'none',
    color: theme.palette.info.main
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


  button: {
    color: theme.palette.primary.light,
    position:'absolute',
    bottom: '10px',
    right: '.5rem',
    background: `linear-gradient(90deg, ${theme.palette.common.gray} 0%,  ${theme.palette.background.default} 150%)`,

    '&:hover': {
      background: theme.palette.primary.main,
      color: theme.palette.common.gray,
    },
    
  },
  

  cardContent: {
    color: theme.palette.info.main,
    height: '64px',
    
  },

  trackInfo: {
    color: theme.palette.info.main,
    fontWeight: '600',
    boxOrient: 'vertical',
    display: '-webkit-box',
    lineClamp: '2',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal'
  },

  trackTitle: {
    fontWeight: '700',
    color: theme.palette.info.main,
    boxOrient: 'vertical',
    display: '-webkit-box',
    lineClamp: '2',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal'
  },
}));

const SpotifyTrack = ({ track, transitionDuration }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const songs = useSelector(state => (state.songs))
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (!Object.values(songs).length || !Object.values(songs).some(song => song.spotify_id)) {
        setOpen(true);
    }
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Slide direction="up" mountOnEnter in timeout={transitionDuration}>
      <Card className={classes.root}>
        <CardMedia
        ><img className={classes.media} alt={track.album.name} src={track.album.images.length > 0 ? track.album.images[0].url : null}/></CardMedia>
        <div className={classes.cardBody}>
        <CardContent className={classes.cardContent}>
              <Typography className={classes.trackTitle} variant="subtitle1">
                {track.name}
              </Typography>      
        </CardContent>
        <CardContent className={classes.cardContent}>
          <Typography clasName={classes.trackInfo} style={{fontWeight: '600'}} variant="subtitle2">
            {track.artists[0].name} < br/>
            {track.album.name}
          </Typography>
        </CardContent>

        <div id="spacer" style={{width: "200px", height: '48px', float: "left", display:"inline-block"}} /> 
        </div>
        <CardActions className={classes.cardActions}>
          <IconButton
            className={classes.button}
            size="small"
            variant="contained"
            onClick={() =>  {
              handleClickOpen()
              dispatch(importSpotifyTrack(track.id))}}
          >
            <CloudDownloadRoundedIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </Slide>
     <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >
          <DialogTitle id="alert-dialog-title">{'Congratulations! You just imported your first song!'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              When you import a song using this feature, SongBook automatically generates song data and section data for you to peruse and/or edit. Also if you haven't yet- integrate your spotify if you have premium to unlock all features that SongBook has to offer! Choose one of the links below to continue to your song or section pages, or stay here and import more songs!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container justify="space-evenly">
              <Grid item >
                <Link to={"/songs"} className={classes.link}>
                  Songs
                </Link>
              </Grid>
              <Grid item>
                <Link to={"/sections"} className={classes.link}>
                  Sections
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={handleClose} className={classes.link}>
                  Stay
                </Link>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </>
  );
};

export default SpotifyTrack;
