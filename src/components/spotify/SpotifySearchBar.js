import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSpotifyTracks } from "../../actions/spotify";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

const SpotifySearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    root: {
      color: "white",
    },

    input: {
      color: "white",
    },

    button: {
      color: "white",
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      width: "100%",
    },

    label: {
      color: "#D31DEA",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Grid container spacing={2} justify="center" className={classes.root}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(fetchSpotifyTracks(query));
          }}
        >
          <Grid item>
            <TextField
              label="Spotify Song Search"
              size="small"
              color="secondary"
              variant="outlined"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              margin="dense"
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{ className: classes.label }}
            />
          </Grid>
          <Grid item>
            <Button className={classes.button} variant="contained">
              Search
            </Button>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default SpotifySearchBar;
