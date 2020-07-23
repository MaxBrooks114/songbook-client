import React from "react";
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
      background: "linear-gradient(360deg, rgba(86,3,114,1) 0%,  rgba(8,199,251,1) 100%)",
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
      background: "linear-gradient(360deg, rgb(254,182,48,1) 0%,  rgb(254,123,235, 1) 80%)",
      "&:hover": {
        background: "rgba(8,199,251,1)",
        color: "rgba(86,3,114,1)",
      },
    },

    cardContent: {
      flexGrow: 1,
      color: "black",
    },

    trackTitle: {
      fontWeight: "bold",
      textShadow: "-1px -1px 0 rgb(254,123,235, 1)",
    },
  }));

  const classes = useStyles();

  return (
    <Slide direction="up" mountOnEnter in timeout={transitionDuration}>
      <Card className={classes.root}>
        <CardMedia className={classes.media} title={track.album.name} image={track.album.images[0].url} />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.trackTitle} gutterBottom variant="h5">
            {track.name}
          </Typography>
          <Typography className>{track.artists[0].name}</Typography>
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
