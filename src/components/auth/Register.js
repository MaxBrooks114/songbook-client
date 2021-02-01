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
    color: theme.palette.info.main,
    width: '50%',
    margin: 'auto',
    padding: '2rem',
    boxShadow: '6px 6px 6px rgba(0,0,0,0.2)',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
    [theme.breakpoints.down('md')]: {
      width: '75%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  title: {
    color: theme.palette.info.main,
    textAlign: "center",
    width: '100%',
      wordWrap: 'break-word', 
      whiteSpace: 'normal',
     [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },

   container: {
      minHeight: '110vh',
    [theme.breakpoints.down('md')]: {
       minHeight: "100vh",
    },
    [theme.breakpoints.down('sm')]: {
       minHeight: '180vh',
    },

  },

  link: {
    color: theme.palette.info.main
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
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
  const user = useSelector(state => state.auth.user)
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
    <Redirect to={`/users/${user.Id}`} />
  ) : (
      <div className={classes.container}>
        <div className={classes.toolbarMargin}></div>
        <div className={classes.root}>
        <Typography className={classes.title} variant="h2" align="center" gutterBottom>
          Register your Songbook
        </Typography>
        <UserForm onSubmit={onSubmit} />
        <div className={classes.toolbarMargin}></div>
        <Typography className={classes.title} variant="subtitle1" align="center">
          Already have an account?{' '}
          <Link className={classes.link} component={RouterLink} to="/login">
            Log in
          </Link>
        </Typography>
        </div>
      </div>
    
  );
};

export default Register;
