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
      background: "linear-gradient(360deg, rgba(86,3,114,1) 0%,  rgba(8,199,251,1) 150%)",
      display: "flex",
      width: 450,
      height: "auto",
      boxShadow: theme.shadows[24],
      marginBottom: 5,
      "&:hover": {
        cursor: "pointer",
      },
    },

    details: {
      display: "flex",
      flexDirection: "row",
    },
    media: {
      width: 151,
      backgroundSize: "cover",
    },
    title: {
      color: theme.palette.primary.main,
    },

    delete: {
      background: `linear-gradient(360deg, ${theme.palette.error.light} 0%,  ${theme.palette.error.main} 80%)`,
      "&:hover": {
        background: "rgba(8,199,251,1)",
        color: "rgba(86,3,114,1)",
        display: "absolute",
      },
    },

    cardContent: {
      flex: "1 0",
    },

    songTitle: {
      fontWeight: "bold",
      textShadow: "-1px -1px 0 rgb(254,123,235, 1)",
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
        <div classes={classes.details}>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.songTitle} gutterBottom>
              {song.title}
            </Typography>
            <Typography className={classes.songTitle}>{song.artist}</Typography>
          </CardContent>
        </div>
      </Card>
    </Slide>
  );
};

export default SongCard;
