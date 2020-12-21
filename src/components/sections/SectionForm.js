import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import keys from '../songs/keys';
import modes from '../songs/modes';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {FileInput, renderTextField, renderAutoCompleteField, renderAutoCompleteDataField, renderCheckbox, renderCheckboxGroup} from '../../helpers/MaterialUiReduxFormFields'
import _  from 'lodash'


const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    '& .MuiOutlinedInput-root': {
      width: 300,
      '& fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main
      },
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

  uploadButton: {
    background: `linear-gradient(90deg, ${theme.palette.info.main} 0%,  ${theme.palette.primary.main} 150%)`,
    '&:hover': {
        background: theme.palette.info.main,
        color: theme.palette.primary.dark,
    },
    margin: '1rem',
    width: 400,
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
    '& .MuiInputBase-root': {
      width: 'auto'
    },
  },

  fieldSet:{
    borderColor: theme.palette.primary.light
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





const SectionForm = ({ songs, onSubmit, handleSubmit, instruments }) => {
  const classes = useStyles();

  const onFormSubmit = (formValues) => {
    console.log(formValues)
    onSubmit(formValues);
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={classes.root}>
      <Grid container alignItems="center" align="center" justify="center" >
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} sm={12} lg={3}>
            <Field classes={classes} required name="name" component={renderTextField} label="Name" />
          </Grid>
          <Grid item xs={12} sm={12} lg={3}>
            <Field
              options={_.uniq(Object.values(songs).map(song => song.title))}
              classes={classes}
              name="song"
              component={renderAutoCompleteDataField}
              label="Song"
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item  xs={12} sm={12} lg={3}>
            <Field
              classes={classes}
              required
              name="duration"
              component={renderTextField}
              label="Duration"
              inputAdornment="(seconds)"
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={3}>
            <Field
              classes={classes}
              required
              name="start"
              component={renderTextField}
              label="Start"
              inputAdornment="(seconds)"
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
          <Grid  item xs={12} sm={12} lg={3}>
            <Field
              classes={classes}
              name="time_signature"
              inputAdornment="/4"
              component={renderTextField}
              label="Time Signature"
            />
          </Grid>
        </Grid>
       <Grid container align="left" justify="center">
          <Grid item xs={10} sm={10} md={8} lg={6}> 
            <fieldset className={classes.fieldSet}>
              <legend>Instruments</legend>
              <Field
                  name="instruments"
                  component={renderCheckboxGroup}
                  options={instruments}
              />
            </fieldset>
         </Grid>
        </Grid>
          <Grid container align="center" justify="center" alignItems="center">
              <Grid item xs={1} lg={3}></Grid>
              <Grid item lg={3}>
                <Field classes={classes} name="original" component={renderCheckbox} label="Original" />
              </Grid>
              <Grid item lg={3}>
                <Field classes={classes} name="learned" component={renderCheckbox} label="learned" />
              </Grid>
              <Grid item xs={1} lg={3}></Grid>
          </Grid>
          <Grid container align="center" justify="center" alignItems="center">
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
         <Grid container justify="center" alignItems="center">
            <fieldset className={classes.fieldSet}>
              <legend>Uploads</legend>
              <Grid item xs={12} sm={12} lg={12}>
                  <Field
                    component={FileInput}
                    name="recording"
                    label="Upload Recording"
                    classes={classes}
                    accept="audio/*"
                    type='file'
                  />
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                  <Field
                    component={FileInput}
                    classes={classes}
                    name="tab"
                    label="Upload Sheet Music/ Tabs"
                    accept="image/*, application/pdf"
                    type='file'
                  />
              </Grid>
            </fieldset>
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
  const requiredFields = ['name', 'song'];
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export default reduxForm({
  form: 'SectionCreate',
  validate,
  initialValues: {prescribed: true},
})(SectionForm);
