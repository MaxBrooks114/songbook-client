import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSongs, fetchSong } from "../../actions/songs";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import SongCard from "./SongCard";
import SongDetail from "./SongDetail";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

const SongList = ({ match }) => {
  const songs = useSelector((state, filter, sort = "artist") =>
    Object.values(state.songs).sort((a, b) => (a[sort] > b[sort] ? 1 : -1))
  );
  const song = useSelector((state) => state.songs[match.params.id]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(2),
      height: 1200,
    },

    list: {
      height: "100%",
      overflow: "auto",
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
          transitionDuration += 50;
          return (
            <ListItem key={song.id}>
              <SongCard song={song} transitionDuration={transitionDuration} handleClick={handleClick} />
            </ListItem>
          );
        })
      : null;

  const renderDetail = () => {
    return song ? <SongDetail song={song} /> : null;
  };

  return (
    <Grid container direction="row" className={classes.cardGrid}>
      <Grid item lg={4} className={classes.list}>
        <Typography variant="h4" className={classes.title}>
          Songs
        </Typography>
        <List dense>{renderedList}</List>
      </Grid>
      <Grid item lg={1}>
        <></>
      </Grid>

      <Grid item lg={7}>
        {renderDetail()}
      </Grid>
    </Grid>
  );
};

export default SongList;
