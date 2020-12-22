import React from 'react';
import { useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import {renderTextField} from '../../helpers/MaterialUiReduxFormFields'

const useStyles = makeStyles((theme) => ({
  root: {
    border: theme.palette.common.pastePurple,
    color: '#D31DEA',
    marginTop: '2rem',

    '& .MuiOutlinedInput-root': {
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
    width: '20%',
    '& .MuiAutocomplete-root': {
      width: 250,
    },
  },

  button: {
    color: theme.palette.info.main,
    marginTop: '1rem',
    marginBottom: '2rem',
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



const LoginForm = ({ onSubmit, handleSubmit }) => {
  const classes = useStyles();
  const messages = useSelector((state) => state.messages);
  const errorMessages = useSelector((state) => state.errors.msg);  const user = useSelector(state => state.auth.user)
  const onFormSubmit = (formValues) => {
    onSubmit(formValues);
  };

  const renderPasswordField = () => {
    return !user ? 
      (<Grid item>
            <Field classes={classes} type="password" name="password" component={renderTextField} label="Password" />
          </Grid>) : (<Link to="/passwordReset">Reset your Password</Link>)
  }

  const renderErrorMessages = () => {
    for (let msg in messages) {
      return messages[msg];
    }
    if (Object.keys(errorMessages).includes('username') || Object.keys(errorMessages).includes('email')) {
      for (let key in errorMessages) {
        for (let msg of errorMessages[key]) {
          return msg;
        }
      }
    }
  };

  return (
    <div>
      <Grid container justify="center" spacing={2}>
        <form onSubmit={handleSubmit(onFormSubmit)} className={classes.root}>
          <Grid item>
            <Field classes={classes} name="username" component={renderTextField} label="Username" />
          </Grid>
              {renderPasswordField()}
          

          <Grid item>
            <Button type="submit" className={classes.button} variant="contained">
              {user ? "Update Information" : "Login"}
            </Button>
          </Grid>
          {renderErrorMessages()}
        </form>
      </Grid>
    </div>
  );
};

const validate = (formValues) => {
  const errors = {};
  const requiredFields = ['username', 'password'];
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export default reduxForm({
  form: 'Login',
  validate,
})(LoginForm);
