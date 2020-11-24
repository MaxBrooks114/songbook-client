import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {renderTextField, renderAutoCompleteField, renderCheckbox} from '../../helpers/MaterialUiReduxFormFields'
import { makeStyles } from '@material-ui/styles';
import genres from './genres';
import keys from './keys';
import modes from './modes';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#D31DEA',
    marginBottom: 6,
    '& .MuiOutlinedInput-root': {
      width: 250,
      '& fieldset': {
        borderColor: '#294C77',
      },
      '&:hover fieldset': {
        borderColor: 'rgb(254,123,235, 1)',
      },
    },
    '& .MuiInputAdornment-root .MuiTypography-colorTextSecondary': {
      color: '#D31DEA',
    },
    ' & .MuiFormHelperText-contained': {
      color: 'red',
    },
  },

  value: {
    color: '#D31DEA',
  },

  autoComplete: {
    color: '#D31DEA',
  },

  button: {
    color: 'white',
    marginTop: '1rem',
    marginBottom: 28,
    background: 'linear-gradient(90deg, rgb(254,182,48,1) 0%,  rgb(254,123,235, 1) 100%)',
    '&:hover': {
      background: 'rgba(8,199,251,1)',
      color: 'rgba(86,3,114,1)',
    },
  },

  input: {
    textTransform: 'capitalize',
  },

  label: {
    color: '#D31DEA',
  },

  lyrics: {
    '& .MuiInputBase-root': {
      width: 800,
    },
  },

  listbox: {
    background: theme.palette.background.default,
  },
  option: {
    color: '#D31DEA',
    textTransform: 'capitalize',

    '&[data-focus="true"]': {
      background: 'rgba(8,199,251,1)',
    },
  },
}));


const SongForm = ({ onSubmit, handleSubmit }) => {
  const classes = useStyles();

  const onFormSubmit = (formValues) => {
    onSubmit(formValues);
  };
  return (
    <div>
      <Grid container alignItems="center" justify="center" spacing={2} direction="row">
        <form onSubmit={handleSubmit(onFormSubmit)} className={classes.root}>
          <Grid item>
            <Field classes={classes} required name="title" component={renderTextField} label="Title" />
          </Grid>
          <Grid item>
            <Field classes={classes} required name="artist" component={renderTextField} label="Artist" />
          </Grid>
          <Grid item xs={4}>
            <Field classes={classes} name="album" component={renderTextField} label="Album" />
          </Grid>
          <Grid item xs={4}>
            <Field
              options={genres.sort((a, b) => (a.name > b.name ? 1 : -1))}
              classes={classes}
              name="genre"
              component={renderAutoCompleteField}
              label="Genre"
            />
          </Grid>
          <Grid>
            <Field options={keys} classes={classes} name="key" component={renderAutoCompleteField} label="Key" />
          </Grid>
          <Grid>
            <Field options={modes} classes={classes} name="mode" component={renderAutoCompleteField} label="Mode" />
          </Grid>
          <Grid item>
            <Field classes={classes} name="tempo" inputAdornment="BPM" component={renderTextField} label="Tempo" />
          </Grid>
          <Grid item>
            <Field
              classes={classes}
              name="time_signature"
              inputAdornment="/4"
              component={renderTextField}
              label="Time Signature"
            />
          </Grid>
          <Grid item>
            <Field classes={classes} name="original" component={renderCheckbox} label="Original" />
          </Grid>
          <Grid item>
            <Field
              fullWidth
              classes={classes}
              className={classes.lyrics}
              name="lyrics"
              multiline
              rows={8}
              component={renderTextField}
              label="Lyrics"
            />
          </Grid>
          <Grid item>
            <Button type="submit" className={classes.button} variant="contained">
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

const validate = (formValues) => {
  const errors = {};
  const requiredFields = ['title', 'artist'];
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export default reduxForm({
  form: 'SongCreate',
  validate,
})(SongForm);
