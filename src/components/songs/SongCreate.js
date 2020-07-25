import React from "react";
import { useDispatch } from "react-redux";
import { createSong } from "../../actions/songs";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import SongForm from "./SongForm";
import keys from "./keys";
import modes from "./modes";

const SongCreate = () => {
  const dispatch = useDispatch();

  const normalize = (list, v) => {
    return v ? Object.keys(list.find((value) => Object.values(value)[0] === v))[0] : null;
  };

  const onSubmit = (formValues) => {
    dispatch(
      createSong({
        ...formValues,
        key: normalize(keys, formValues.key),
        mode: normalize(modes, formValues.mode),
      })
    );
  };

  const useStyles = makeStyles(() => ({
    root: {
      color: "white",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.root} component="h1" variant="h2" align="center" gutterBottom>
        Create a Song
      </Typography>
      <SongForm onSubmit={onSubmit} />
    </div>
  );
};

export default SongCreate;
