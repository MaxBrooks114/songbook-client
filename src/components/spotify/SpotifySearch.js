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
    <div>
      <div className={classes.toolbarMargin}></div>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.root}>
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          Spotify Search
        </Typography>
        <Typography variant="h5" align="center" paragraph>
          Search a song, learn a song.
        </Typography>
        <SpotifySearchBar />
      </Container>
      {renderTracklist()}
    </div>
  );
};

export default SpotifySearch;
