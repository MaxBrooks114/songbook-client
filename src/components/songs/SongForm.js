import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {renderTextField, renderAutoCompleteField, renderCheckbox} from '../../helpers/MaterialUiReduxFormFields'
import { makeStyles } from '@material-ui/styles';
import genres from './genres';
import keys from './keys';
import modes from './modes';

const useStyles = makeStyles((theme) => ({
  
  root: {
    color: 'white',
    '& .MuiOutlinedInput-root': {
      width: 300,
      '& fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
      },

    },

     '& .MuiInputBase-input': {
      fontSize: '1rem'
    },

    '& .MuiInputAdornment-root .MuiTypography-colorTextSecondary': {
      color: 'white',
    },
    ' & .MuiFormHelperText-contained': {
      color: theme.palette.common.red,
    },

   
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.red
    },

    '& .MuiFormLabel-root.Mui-error': {
      color: theme.palette.common.red,
    }

  },

 

  value: {
    color: 'white',
  },

  autoComplete: {
    color: 'white',
  },

  button: {
    ...theme.button,
    margin: '1rem',
    width: 200,
    [theme.breakpoints.down('xs')]: {
          width: 'auto', 
      },
  },

  input: {
    textTransform: 'capitalize',
  },

  label: {
    color: 'white',
  },

  lyrics: {
    '& .MuiOutlinedInput-root': {
      width: 'auto'
    },
   

  },

  listbox: {
    background: theme.palette.background.default,
  },
  option: {
    color: 'white',
    textTransform: 'capitalize',

    '&[data-focus="true"]': {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.dark
    },
  },
}));


const SongForm = ({ onSubmit, handleSubmit }) => {

  const classes = useStyles()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const onFormSubmit = (formValues) => {
    onSubmit(formValues);
  };
  return (
  
    <form onSubmit={handleSubmit(onFormSubmit)} className={classes.root}>
        <Grid container  align="center" justify="center" >
            <Grid container justify="center">
              <Grid item xs={12} sm={12} lg={3}>
                <Field classes={classes} required name="title" component={renderTextField} label="Title" />
              </Grid>
              <Grid item xs={12} sm={12} lg={3}>
                <Field classes={classes} required name="artist" component={renderTextField} label="Artist" />
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item  xs={12} sm={12} lg={3}>
                <Field classes={classes} name="album" component={renderTextField} label="Album" />
              </Grid>
              <Grid item xs={12} sm={12} lg={3}>
                <Field
                  options={genres.sort((a, b) => (a.name > b.name ? 1 : -1))}
                  classes={classes}
                  name="genre"
                  component={renderAutoCompleteField}
                  label="Genre"
                />
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item xs={12} sm={12} lg={3}>
                <Field options={keys} classes={classes} name="key" component={renderAutoCompleteField} label="Key" />
              </Grid>
              <Grid item xs={12} sm={12} lg={3}>
                <Field options={modes} classes={classes} name="mode" component={renderAutoCompleteField} label="Mode" />
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item xs={12} sm={12} lg={3}>
                <Field classes={classes} name="tempo" inputAdornment="BPM" component={renderTextField} label="Tempo" />
              </Grid>
              <Grid item xs={12} sm={12} lg={3}>
                <Field
                  classes={classes}
                  name="time_signature"
                  inputAdornment="/4"
                  component={renderTextField}
                  label="Time Signature"
                />
              </Grid>
            </Grid>
            <Grid container align="center" justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <Field classes={classes} name="original" component={renderCheckbox} label="Original" />
              </Grid>
              <Grid item xs={1} lg={2}></Grid>
              <Grid item xs={10} lg={8}>
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
               <Grid item xs={1} lg={2}></Grid>
            </Grid>
            <Grid container justify="center"> 
              <Grid item xs={3}>
                <Button type="submit" className={classes.button} variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
      </Grid>
        </form>

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
