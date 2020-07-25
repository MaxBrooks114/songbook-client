import React from "react";
import SpotifyTrack from "./SpotifyTrack";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

const SpotifyTrackList = ({ tracks }) => {
  const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(4),
    },
  }));

  const classes = useStyles();
  let transitionDuration = 50;

  const renderedList = tracks.map((track) => {
    transitionDuration += 450;
    return (
      <Grid key={track.id} item xs={12} sm={6} md={4} lg={3}>
        <SpotifyTrack track={track} transitionDuration={transitionDuration} />
      </Grid>
    );
  });

  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Grid container spacing={6}>
        {renderedList}
      </Grid>
    </Container>
  );
};

export default SpotifyTrackList;
