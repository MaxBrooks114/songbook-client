import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/auth';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import UserForm from './UserForm';
import { Link as RouterLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    // marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },
}));

const Register = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const onSubmit = (formValues) => {
    dispatch(
      register({
        ...formValues,
      })
    );
  };

  const classes = useStyles();

  return isAuthenticated ? (
    <Redirect to="/songs/new" />
  ) : (
    <>
      <div className={classes.toolbarMargin}></div>
      <div>
        <Typography className={classes.root} variant="h2" align="center" gutterBottom>
          Register your Songbook
        </Typography>
        <UserForm onSubmit={onSubmit} />
        <div className={classes.toolbarMargin}></div>
        <Typography className={classes.root} variant="subtitle1" align="center">
          Already have an account?{` `}
          <Link component={RouterLink} to="/login">
            Log in
          </Link>
        </Typography>
      </div>
    </>
  );
};

export default Register;
