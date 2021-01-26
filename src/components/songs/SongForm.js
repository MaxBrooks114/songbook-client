import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import {renderTextField, renderAutoCompleteField, renderCheckbox} from '../../helpers/MaterialUiReduxFormFields'
import { makeStyles } from '@material-ui/styles';
import genres from './genres';
import keys from './keys';
import modes from './modes';

const useStyles = makeStyles((theme) => ({
  
  root: {
   
    '& .MuiOutlinedInput-root': {
      background: theme.palette.background.default,
      width: 300,
      [theme.breakpoints.down('md')]: {
          width: 240,
      },
      [theme.breakpoints.down('sm')]: {
          width: 200,
      },
      '& fieldset': {
        borderColor: theme.palette.info.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.dark,
      },

    },

     '& .MuiInputBase-input': {
      fontSize: '1rem'
    },

    '& .MuiInputAdornment-root .MuiTypography-colorTextSecondary': {
      color: theme.palette.info.main,
    },
    ' & .MuiFormHelperText-contained': {
      color: theme.palette.common.orange,
    },

    '& .MuiFormLabel-asterisk': {
      color: theme.palette.common.orange,
      fontSize: 20
    },

   
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.orange
    },

    '& .MuiFormLabel-root.Mui-error': {
      color: theme.palette.common.orange,
    }

  },

 

  value: {
    color: theme.palette.info.main,
  },

  autoComplete: {
    color: theme.palette.info.main,
  },

  button: {
   color: theme.palette.info.main,
    display: 'inline-block',
    borderRadius: 4,
    background: theme.palette.common.gray,

  },

  input: {
    textTransform: 'capitalize',
  },

 
  label: {
    color: theme.palette.info.main,  
   
    '&.shrink': {
           color: theme.palette.info.main
        },
      },

  checkBox: {
     '&.Mui-checked': {    
        color: theme.palette.info.main
       }
      
  },

  lyrics: {
    '& .MuiOutlinedInput-root': {
      width: 'auto',
      minWidth: 300,
       [theme.breakpoints.down('sm')]: {
          minWidth: 200,
      },
    },
   

  },

  listbox: {
    background: theme.palette.background.default,
  },
  option: {
    color: theme.palette.info.main,
    textTransform: 'capitalize',

    '&[data-focus="true"]': {
      background: theme.palette.primary.main,
      color: theme.palette.background.default
    },
  },
}));


const SongForm = ({ onSubmit, handleSubmit }) => {

  const classes = useStyles()

  const onFormSubmit = (formValues) => {
    onSubmit(formValues);
  };
  return (
  
    <form onSubmit={handleSubmit(onFormSubmit)} className={classes.root}>
        <Grid container align="center" alignItems="flex-end" justify="center" >
              
              <Grid item xs={12}  md={6}>
                <Field classes={classes} required name="title" component={renderTextField} label="Title" InputLabelProps={{ 
                    classes: {
                      root: classes.label,
                      shrink: "shrink"
                 }
               }}/>
              </Grid>
              <Grid item xs={12}  md={6}>
                <Field classes={classes} required name="artist" component={renderTextField} label="Artist" InputLabelProps={{ 
                    classes: {
                      root: classes.label,
                      shrink: "shrink"
                 }
               }}/>
              </Grid>
              
              <Grid item  xs={12}  md={6}>
                <Field classes={classes} name="album" component={renderTextField} label="Album" InputLabelProps={{ 
                    classes: {
                      root: classes.label,
                      shrink: "shrink"
                 }
               }} />
              </Grid>
              <Grid item xs={12}  md={6}>
                <Field
                  options={genres.sort((a, b) => (a.name > b.name ? 1 : -1))}
                  classes={classes}
                  name="genre"
                  component={renderAutoCompleteField}
                  label="Genre"
                  InputLabelProps={{ 
                    classes: {
                      root: classes.label,
                      shrink: "shrink"
                 }
               }}
                />
              </Grid>
                   
              <Grid item xs={12}  md={6}>
                <Field options={keys} classes={classes} name="key" component={renderAutoCompleteField} label="Key" InputLabelProps={{ 
                    classes: {
                      root: classes.label,
                      shrink: "shrink"
                 }
               }} />
              </Grid>
              <Grid item xs={12}  md={6}>
                <Field options={modes} classes={classes} name="mode" component={renderAutoCompleteField} label="Mode" InputLabelProps={{ 
                    classes: {
                      root: classes.label,
                      shrink: "shrink"
                 }
               }} />
              </Grid>
                  
              <Grid item xs={12}  md={6}>
                <Field classes={classes} name="tempo" inputAdornment="BPM" component={renderTextField} label="Tempo" />
              </Grid>
              <Grid item xs={12}  md={6}>
                <Field
                  classes={classes}
                  name="time_signature"
                  inputAdornment="/4"
                  component={renderTextField}
                  label="Time Signature"
                  InputLabelProps={{ 
                    classes: {
                      root: classes.label,
                      shrink: "shrink"
                 }
               }}
                />
              </Grid>
        
               
              <Grid item xs={12} >
                <Field
                  fullWidth
                  classes={classes}
                  className={classes.lyrics}
                  name="lyrics"
                  multiline
                  rows={8}
                  component={renderTextField}
                  label="Lyrics"
                  InputLabelProps={{ 
                    classes: {
                      root: classes.label,
                      shrink: "shrink"
                 }
               }}
                />
              </Grid>
            <Grid container  alignItems="flex-end" justify="space-between">
            <Grid item xs={4}>
              <Field classes={classes} name="original" component={renderCheckbox} label="Original" />
            </Grid> 
            <Grid item xs={4}>
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
