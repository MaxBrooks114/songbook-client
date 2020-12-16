import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import { instrumentList, instrumentFamilies, instrumentTonalities } from './instruments';
import {renderTextField, renderAutoCompleteDataField} from '../../helpers/MaterialUiReduxFormFields'


const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',

    '& .MuiOutlinedInput-root': {
      width: 300,
      '& fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&:hover fieldset': {
        borderColor: 'rgb(254,123,235, 1)',
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

  input: {
    textTransform: 'capitalize',
  },

  label: {
    color: 'white',
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


const InstrumentForm = ({ onSubmit, handleSubmit }) => {
  const classes = useStyles();

  const onFormSubmit = (formValues) => {
    onSubmit(formValues);
  };
  return (
    
    <form onSubmit={handleSubmit(onFormSubmit)} className={classes.root}>
      <Grid container alignItems="center" align="center" justify="center" >
        <Grid container justify="center" alignItems="center">
         <Grid item xs={12} sm={12} lg={3}>
            <Field
              classes={classes}
              required
              options={instrumentList.sort()}
              name="name"
              component={renderAutoCompleteDataField}
              label="Name"
            />
          </Grid>
         <Grid item xs={12} sm={12} lg={3}>
            
            <Field classes={classes} name="make" component={renderTextField} label="Make" />
          </Grid>
        </Grid>
        <Grid container  alignItems="center" justify="center">
          <Grid item  xs={12} sm={12} lg={3}>
             
            <Field
              options={instrumentFamilies.sort()}
              classes={classes}
              name="family"
              component={renderAutoCompleteDataField}
              label="Family"
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={3}>
           <Field classes={classes} name="model" component={renderTextField} label="Model" />
          </Grid>
          </Grid>
          <Grid container alignItems="center"  justify="center">
          <Grid item  xs={12} sm={12} lg={3}>
            <Field
              options={instrumentTonalities.sort()}
              classes={classes}
              name="tonal_range"
              component={renderAutoCompleteDataField}
              label="Tonality"
            />
          </Grid>
          <Grid item  xs={12} sm={12} lg={3}>
            <Field classes={classes} name="year" component={renderTextField} label="Year" />
          </Grid>
          </Grid>
          <Grid item xs={3}>
            <Button type="submit" className={classes.button} variant="contained">
              Submit
            </Button>
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
  form: 'InstrumentCreate',
  validate,
})(InstrumentForm);
