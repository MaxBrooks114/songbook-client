import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSpotifyTracks } from '../../actions/spotify';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.info.main,
  },

  input: {
    color: theme.palette.info.main,
    textAlign: 'center'
  },

  button: {
    borderRadius: '5em',
    color: theme.palette.background.default,
    background: `linear-gradient(90deg, ${theme.palette.primary.light} 0%,  ${theme.palette.primary.dark} 150%)`,
    width: '100%',
    '&:hover': {
      background: theme.palette.common.gray,
      color: theme.palette.info.main,
    },
  },

  label: {
    color: theme.palette.info.main,
    textAlign: 'center',
    marginLeft: '31px',
    '&.shrink': {
           transform: 'translate(-16px, -6px) scale(0.75)',
          },
      },
}));

const SpotifySearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

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
              label="Search Spotify"
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
              InputLabelProps={{ 
                classes: {
                  root: classes.label,
                  shrink: "shrink"
                 }
               }}
            />
          </Grid>
          <Grid item>
            <Button type="submit" className={classes.button} variant="contained">
              Search
            </Button>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default SpotifySearchBar;
