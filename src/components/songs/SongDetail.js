import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteSong } from "../../actions/songs";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import modes from "./modes";
import keys from "./keys";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const SongDetail = ({ song }) => {
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    root: {
      background: "linear-gradient(360deg, rgba(86,3,114,1) 0%,  rgba(8,199,251,1) 150%)",
      marginLeft: 100,
      textTransform: "capitalize",
      color: theme.palette.primary.main,
      position: "fixed",
    },

    media: {
      width: 151,
      backgroundSize: "cover",
    },
    details: {
      background: "linear-gradient(360deg, rgba(86,3,114,1) 0%,  rgba(8,199,251,1) 150%)",
      color: "white",
      marginLeft: 2,
    },

    accordion: {
      background: "linear-gradient(360deg, rgba(86,3,114,1) 0%,  rgba(8,199,251,1) 150%)",
      color: "white",
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

  const renderBool = (bool) => {
    return song.bool ? "Yes" : "No";
  };

  const renderText = (list, v) => {
    return v || v === 0 ? list.find((k) => k[v])[v] : null;
  };

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return song ? (
    <Slide direction="up" mountOnEnter unmountOnExit in transition={150}>
      <Paper variant="outlined" className={classes.root} elevation={3}>
        <div className={classes.details}>
          <Typography>{song.title}</Typography>
          <Typography>{song.artist}</Typography>
          <Typography>{song.album}</Typography>
          <Typography>{song.year}</Typography>
          <Typography>Genre: {song.genre}</Typography>
          <Typography>Tempo: {song.tempo} BPM</Typography>
          <Typography>Key: {renderText(keys, song.key)}</Typography>
          <Typography>Mode: {renderText(modes, song.mode)}</Typography>
          <Typography>Time Signature: {song.time_signature}/4</Typography>
          <Typography>Duration: {millisToMinutesAndSeconds(song.duration)}</Typography>
          <Typography>Original?: {renderBool(song.original)}</Typography>
          <Typography>Explicit?: {renderBool(song.explicit)}</Typography>
          <Accordion className={classes.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Advanced</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Acousticness: {song.acousticness}</Typography>
              <Typography>Danceability: {song.danceability}</Typography>
              <Typography>Energy: {song.energy}</Typography>
              <Typography>Instrumentalness: {song.instrumentalness}</Typography>
              <Typography>Liveness: {song.liveness}</Typography>
              <Typography>Loudness: {song.loudness}</Typography>
              <Typography>Speechiness: {song.speechiness}</Typography>
              <Typography>Valence: {song.loudness}</Typography>
            </AccordionDetails>
          </Accordion>
          <Typography>{song.lyrics}</Typography>

          <Button className={classes.delete} onClick={() => dispatch(deleteSong(song.id))}>
            Delete
          </Button>
        </div>
      </Paper>
    </Slide>
  ) : null;
};

export default SongDetail;
