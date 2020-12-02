import React from 'react';
import { useSelector, connect } from 'react-redux';
import SpotifySearchBar from './SpotifySearchBar';
import SpotifyTrackList from './SpotifyTrackList';
import { fetchSpotifyTracks } from '../../actions/spotify';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    height: "6500px",

    [theme.breakpoints.down('lg')]: {
        height: "7500px"
    },

    [theme.breakpoints.down('md')]: {
        height: "8500px"
    },

    [theme.breakpoints.down('sm')]: {
        height: "12000px"
    },
    [theme.breakpoints.down('xs')]: {
        height: "23000px"
    }
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    // marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },
}));

const SpotifySearch = ({ fetchSpotifyTracks }) => {
  const classes = useStyles();

  const tracks = useSelector((state) => state.spotifyTracks);

  const renderTracklist = () => {
    return Object.keys(tracks).length > 0 ? <SpotifyTrackList tracks={Object.values(tracks)} /> : '';
  };

  return (
    <div className={classes.root}>
      <div className={classes.toolbarMargin}></div>
      <CssBaseline />
      <Container  >
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          Spotify Search
        </Typography>
        <Typography variant="h5" align="center" paragraph>
          Search a song, learn a song.
        </Typography>
        <SpotifySearchBar />
      {renderTracklist()}
      </Container>
    </div>
  );
};

export default SpotifySearch;
