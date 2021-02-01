import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '../../actions/messages';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import {renderTextField} from '../../helpers/MaterialUiReduxFormFields'


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

 
}));


const UserForm = ({ onSubmit, handleSubmit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const errorMessages = useSelector((state) => state.errors.msg);
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
  const onFormSubmit = (formValues) => {
    const { password, confirm_password } = formValues;
    if (password !== confirm_password) {
      dispatch(createMessage({ passwordNotMatch: 'Passwords must match' }));
    } else {
      onSubmit(formValues);
    }
  };
  return (
    <div>
      <Grid container align= "center" justify="center" spacing={2}>
        <form onSubmit={handleSubmit(onFormSubmit)} className={classes.root}>
          <Grid item>
            <Field classes={classes} name="username" component={renderTextField} label="Username" />
          </Grid>
          <Grid item>
            <Field classes={classes} type="email" name="email" component={renderTextField} label="E-Mail" />
          </Grid>
          <Grid item>
            <Field classes={classes} type="password" name="password" component={renderTextField} label="Password" />
          </Grid>
          <Grid item>
            <Field
              classes={classes}
              type="password"
              name="confirm_password"
              component={renderTextField}
              label="Confirm Password"
            />
          </Grid>

          <Grid item>
            <Button type="submit" className={classes.button} variant="contained">
              Register
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
  const requiredFields = ['username', 'email', 'password', 'confirm_password'];
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export default reduxForm({
  form: 'Register',
  validate,
})(UserForm);
