import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/auth';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LoginForm from './LoginForm';
import { Link as RouterLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.info.main,
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

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const onSubmit = (formValues) => {
    dispatch(
      login({
        ...formValues,
      })
    );
  };

  const classes = useStyles();

  return isAuthenticated && user ? (
    <Redirect to={`/users/${user.id}`} />
  ) : (
    <>
      <div className={classes.toolbarMargin}></div>
      <div>
        <Typography className={classes.root} variant="h2" align="center" gutterBottom>
          Log in To Songbook
        </Typography>
        <LoginForm onSubmit={onSubmit} />
        <div className={classes.toolbarMargin}></div>
        <Typography className={classes.root} variant="subtitle1" align="center">
          Don't have an account?{` `}
          <Link component={RouterLink} to="/register">
            Register
          </Link>
        </Typography>
      </div>
    </>
  );
};

export default Login;
