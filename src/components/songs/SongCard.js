import React from "react";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";

const SongCard = ({ song, transitionDuration, handleClick }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      background: "#294C77",
      display: "flex",
      width: "100%",
      height: "auto",
      boxShadow: theme.shadows[24],
      "&:hover": {
        cursor: "pointer",
      },
    },
    media: {
      width: 151,
      backgroundSize: "cover",
    },
    songTitle: {
      color: "black",
      fontWeight: "bold",
    },
  }));

  const classes = useStyles();

  return (
    <Slide direction="up" mountOnEnter in timeout={transitionDuration}>
      <Card className={classes.root} onClick={() => handleClick(song.id)}>
        <CardMedia
          className={classes.media}
          image={song.image ? song.image : "https://coverfiles.alphacoders.com/796/79685.jpg"}
        />

        <CardContent className={classes.cardContent}>
          <Typography className={classes.songTitle} gutterBottom>
            {song.title}
          </Typography>
          <Typography className={classes.songTitle}>{song.artist}</Typography>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default SongCard;
