import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

const SpotifyTrack = ({ track, transitionDuration }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      background: "linear-gradient(360deg, rgba(86,3,114,1) 0%,  rgba(8,199,251,1) 80%)",
      color: "black",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      boxShadow: theme.shadows[10],
      transition: theme.transitions.easeIn,
    },
    media: {
      height: 200,
      width: "100%",
      backgroundSize: "cover",
    },
    title: {
      color: theme.palette.primary.main,
    },

    button: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    },

    cardContent: {
      flexGrow: 1,
      color: "black",
    },
  }));

  const classes = useStyles();

  return (
    <Slide direction="up" mountOnEnter in timeout={transitionDuration}>
      <Card className={classes.root}>
        <CardMedia className={classes.media} title={track.album.name} image={track.album.images[0].url} />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {track.name}
          </Typography>
          <Typography>{track.artists[0].name}</Typography>
          <Typography>
            {track.album.name}, {track.album.release_date}
          </Typography>
        </CardContent>
        <CardActions>
          <Button className={classes.button} size="small" variant="contained" color="primary">
            Import Song
          </Button>
        </CardActions>
      </Card>
    </Slide>
  );
};

export default SpotifyTrack;
