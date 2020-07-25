import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSongs, fetchSong } from "../../actions/songs";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import SongCard from "./SongCard";
import SongDetail from "./SongDetail";

const SongList = ({ match }) => {
  const songs = useSelector((state) => state.songs);
  const song = useSelector((state) => state.songs[match.params.id]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  let transitionDuration = 50;

  const handleClick = (id) => {
    dispatch(fetchSong(id));
  };

  const renderedList =
    Object.values(songs).length > 0
      ? Object.values(songs).map((song) => {
          transitionDuration += 450;
          return (
            <Grid item key={song.id}>
              <SongCard song={song} transitionDuration={transitionDuration} handleClick={handleClick} />
            </Grid>
          );
        })
      : null;

  const renderDetail = () => {
    return song ? <SongDetail song={song} /> : null;
  };

  return (
    <Grid container direction="row" className={classes.cardGrid}>
      <Grid item>{renderedList}</Grid>
      <Grid item md={8} className={classes.details}>
        {renderDetail()}
      </Grid>
    </Grid>
  );
};

export default SongList;
