import React from 'react';
import { useSelector } from 'react-redux';
import SpotifySearchBar from './SpotifySearchBar';
import SpotifyTrackList from './SpotifyTrackList';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.info.main,
    minHeight: '100vh',
  
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },

   cardGrid: {
    marginBottom: theme.spacing(8),
  },

 



}));

const SpotifySearch = () => {
  const classes = useStyles();



  const tracks = useSelector((state) => state.spotifyTracks);

  const renderTracklist = () => {
    return Object.keys(tracks).length > 0 ? <SpotifyTrackList tracks={Object.values(tracks)} /> : '';
  };

  return (
    <div className={classes.root}>
      <div className={classes.toolbarMargin}></div>
      <Grid container justify="center" className={classes.cardGrid} >
        <Grid item  xs={12}>
        <Typography  variant="h2" align="center" >
          Spotify Search
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" align="center" gutterBottom>
          Search a song, learn a song.
        </Typography>
      </Grid>
      <Grid item  xs={12}>
        <SpotifySearchBar showButton={true} />
      </Grid>
      <Grid item xs={10} >
      {renderTracklist()}
      </Grid>
      </Grid>
      
    </div>
  );
};

export default SpotifySearch;
