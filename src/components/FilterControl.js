import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../actions/filter';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/styles';

const FilterControl = () => {
  const dispatch = useDispatch();
  const [attribute, setAttribute] = useState('');
  const [value, setValue] = useState('');

  const useStyles = makeStyles((theme) => ({
    root: {
      color: 'white',
    },

    input: {
      color: 'white',
      height: '100%',
      marginRight: 2,
    },

    button: {
      color: 'white',
      background: 'linear-gradient(90deg, rgba(8,199,251,1) 0%,  rgb(254,123,235, 1) 150%)',
      width: '50%',
      '&:hover': {
        background: 'rgba(8,199,251,1)',
        color: 'rgba(86,3,114,1)',
      },
    },

    label: {
      color: '#D31DEA',
    },
  }));

  const classes = useStyles();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(setFilter(attribute, value));
        }}
      >
        <InputLabel className={classes.label}>Filter By</InputLabel>
        <Select
          variant="outlined"
          size="small"
          native
          value={attribute}
          onChange={(e) => setAttribute(e.target.value)}
          InputProps={{
            className: classes.input,
          }}
          InputLabelProps={{ className: classes.label }}
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

        <TextField
          label="Search"
          size="small"
          color="secondary"
          variant="outlined"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          margin="dense"
          InputProps={{
            className: classes.input,
          }}
          InputLabelProps={{ className: classes.label }}
        />

        <Button type="submit" className={classes.button} variant="contained">
          Filter
        </Button>
      </form>
    </>
  );
};

export default FilterControl;
