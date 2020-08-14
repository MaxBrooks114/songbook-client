import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '../../actions/messages';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    border: theme.palette.common.pastePurple,
    color: '#D31DEA',
    marginTop: '2rem',
    marginLeft: '4rem',

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
    color: 'white',
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

const renderTextField = ({
  helperText,
  meta: { touched, error },
  rows,
  multiline,
  inputAdornment,
  classes,
  input,
  label,
  required,
  ...custom
}) => {
  return (
    <TextField
      label={label}
      size="small"
      helperText={touched && error}
      error={touched && error}
      color="secondary"
      variant="outlined"
      margin="dense"
      required={required}
      multiline={multiline}
      rows={rows}
      autoComplete="off"
      InputProps={{
        className: classes.value,
      }}
      InputLabelProps={{ className: classes.label }}
      {...input}
      {...custom}
    />
  );
};

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
      <Grid container justify="center" spacing={2}>
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