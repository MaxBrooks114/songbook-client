import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import { instrumentList, instrumentFamilies, instrumentTonalities } from './instruments';
import {renderTextField, renderAutoCompleteDataField} from '../../helpers/MaterialUiReduxFormFields'


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
    '& .MuiInputAdornment-root .MuiTypography-colorTextSecondary': {
      color: theme.palette.info.main,
    },
    ' & .MuiFormHelperText-contained': {
      color: theme.palette.common.orange,
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


const InstrumentForm = ({ onSubmit, handleSubmit }) => {
  const classes = useStyles();

  const onFormSubmit = (formValues) => {
    onSubmit(formValues);
  };
  return (
    
    <form onSubmit={handleSubmit(onFormSubmit)} className={classes.root}>
      <Grid container alignItems="flex-end" align="center" justify="flex-end" >
         <Grid item style={{marginBottom: '4px'}} xs={12} md={6}>
            <Field
              classes={classes}
              required
              options={instrumentList.sort()}
              name="name"
              component={renderAutoCompleteDataField}
              label="Name"
            />
          </Grid>

          <Grid item  xs={12} md={6}>
            <Field classes={classes} name="year" component={renderTextField} label="Year"  InputLabelProps={{ 
                    classes: {
                      root: classes.label,
                      shrink: "shrink"
                 }
               }}/>
          </Grid>
         <Grid item style={{marginBottom: '4px'}} xs={12} md={6}>    
            <Field classes={classes} name="make" component={renderTextField} label="Make"  InputLabelProps={{ 
                    classes: {
                      root: classes.label,
                      shrink: "shrink"
                 }
               }} />
          </Grid>

          <Grid item style={{marginBottom: '4px'}} xs={12} md={6}>
           <Field classes={classes} name="model" component={renderTextField} label="Model"  InputLabelProps={{ 
                    classes: {
                      root: classes.label,
                      shrink: "shrink"
                 }
               }}/>
          </Grid>
          <Grid item style={{marginBottom: '4px'}} xs={12}  md={6}>         
            <Field

              options={instrumentFamilies.sort()}
              classes={classes}
              name="family"
              component={renderAutoCompleteDataField}
              label="Family"
               InputLabelProps={{ 
                    classes: {
                      root: classes.label,
                      shrink: "shrink"
                 }
               }}
            />
          </Grid>
         
          <Grid item style={{marginBottom: '4px'}} xs={12} md={6}>
            <Field
              options={instrumentTonalities.sort()}
              classes={classes}
              name="tonal_range"
              component={renderAutoCompleteDataField}
              label="Tonality"
               InputLabelProps={{ 
                    classes: {
                      root: classes.label,
                      shrink: "shrink"
                 }
               }}
            />
          </Grid>
         
          <Grid item xs={12}  md={3} style={{marginTop: '12px'}} >
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
