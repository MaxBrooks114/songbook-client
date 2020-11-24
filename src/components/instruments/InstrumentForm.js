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
    color: '#D31DEA',

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


const InstrumentForm = ({ onSubmit, handleSubmit }) => {
  const classes = useStyles();

  const onFormSubmit = (formValues) => {
    onSubmit(formValues);
  };
  return (
    <div>
      <Grid container alignItems="center" justify="center" spacing={2} direction="row">
        <form onSubmit={handleSubmit(onFormSubmit)} className={classes.root}>
          <Grid item>
            <Field
              classes={classes}
              required
              options={instrumentList.sort()}
              name="name"
              component={renderAutoCompleteDataField}
              label="Name"
            />
          </Grid>
          <Grid item>
            <Field classes={classes} name="make" component={renderTextField} label="Make" />
          </Grid>
          <Grid item>
            <Field classes={classes} name="model" component={renderTextField} label="Model" />
          </Grid>
          <Grid item>
            <Field
              options={instrumentFamilies.sort()}
              classes={classes}
              name="family"
              component={renderAutoCompleteDataField}
              label="Family"
            />
          </Grid>
          <Grid item>
            <Field
              options={instrumentTonalities.sort()}
              classes={classes}
              name="tonal_range"
              component={renderAutoCompleteDataField}
              label="Tonality"
            />
          </Grid>

          <Grid item>
            <Field classes={classes} name="year" component={renderTextField} label="Year" />
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
  form: 'InstrumentCreate',
  validate,
})(InstrumentForm);
