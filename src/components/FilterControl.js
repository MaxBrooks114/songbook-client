import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../actions/filter';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    color: '#fff',
    marginLeft: 14,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.common.pastelPurple,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.common.neonBlue,
      },
    },
  },

  select: {
    height: 40,
  },

  button: {
    color: 'white',
    background: 'linear-gradient(90deg, rgba(8,199,251,1) 0%,  rgb(254,123,235, 1) 150%)',

    '&:hover': {
      background: 'rgba(8,199,251,1)',
      color: 'rgba(86,3,114,1)',
    },
  },
}));

const FilterControl = () => {
  const dispatch = useDispatch();
  const [attribute, setAttribute] = useState('');
  const [value, setValue] = useState('');

  const classes = useStyles();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(setFilter(attribute, value));
        }}
      >
        <FormControl className={classes.formControl}>
          <Grid container justify="flex-start" spacing={0} alignItems="flex-end">
            <Grid item xs={12} sm={2}>
              <FormControl variant="outlined">
                <InputLabel>Filter By</InputLabel>
                <Select
                  fullWidth
                  native
                  color="secondary"
                  value={attribute}
                  label="Filter By"
                  onChange={(e) => setAttribute(e.target.value)}
                >
                  <option aria-label="None" value="" />
                  <option value="title">Title</option>
                  <option value="artist">Artist</option>
                  <option value="album">Album</option>
                  <option value="year">Release Year</option>
                  <option value="genre">Genre</option>
                  <option value="duration">Duration (min)</option>
                  <option value="key">Key</option>
                  <option value="mode">Mode</option>
                  <option value="time_signature">Time Signature</option>
                  <option value="tempo">Tempo</option>
                  <option value="acousticness">Acousticness</option>
                  <option value="danceability">Danceability</option>
                  <option value="energy">Energy</option>
                  <option value="instrumentalness">Instrumentalness</option>
                  <option value="liveness">Liveness</option>
                  <option value="speechiness">Speechiness</option>
                  <option value="valence">Valence</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Filter"
                color="secondary"
                variant="outlined"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoComplete="off"
              />
            </Grid>
            <Grid item sm={4}>
              <Button className={classes.button} type="submit" variant="contained">
                Filter
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </>
  );
};

export default FilterControl;
