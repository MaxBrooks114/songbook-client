import React from "react";
import { useSelector, connect } from "react-redux";
import SpotifySearchBar from "./SpotifySearchBar";
import SpotifyTrackList from "./SpotifyTrackList";
import { fetchSpotifyTracks } from "../../actions/spotify/index";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/styles";

const SpotifySearch = ({ fetchSpotifyTracks }) => {
  const useStyles = makeStyles(() => ({
    root: {
      color: "white",
    },
  }));

  const classes = useStyles();

  const tracks = useSelector((state) => state.spotifyTracks);

  const renderTracklist = () => {
    return Object.keys(tracks).length > 0 ? <SpotifyTrackList tracks={Object.values(tracks)} /> : "";
  };

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.root}>
        <Typography component="h1" variant="h2" align="center" gutterBottom>
          Spotify Search
        </Typography>
        <Typography variant="h5" align="center" paragraph>
          Search a song, learn a song.
        </Typography>
        <SpotifySearchBar onFormSubmit={fetchSpotifyTracks} />
      </Container>
      {renderTracklist()}
    </div>
  );
};

export default connect(null, { fetchSpotifyTracks })(SpotifySearch);
