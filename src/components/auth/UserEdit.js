import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser, deleteUser } from '../../actions/auth';
import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm'
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

  buttonContainer: {
      marginTop: '1rem'
  },

  button:{

    color: theme.palette.info.main,
    display: 'inline-block',
    borderRadius: 4,
    background: theme.palette.common.orange,
     '&:hover': {
      color: theme.palette.common.orange,
      background: theme.palette.info.main,
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

}));



const UserEdit = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user.id)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const onSubmit = (formValues) => {
    dispatch(
      editUser(userId, {
       ...formValues,
      })
    );
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return !isAuthenticated ? (
    <Redirect to={`/login`} />
  ) : (
    <div className={classes.container}>
      <div className={classes.toolbarMargin}></div>
      <div className={classes.root} >
        <Typography className={classes.title} component="h1" variant="h2" align="center" gutterBottom>
          Edit Your Information
        </Typography>
        <LoginForm onSubmit={onSubmit} />
        <Grid container justify="center" className={classes.buttonContainer}>
            <Button className={classes.button} onClick={handleClickOpen}>
              Delete
            </Button>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete your account?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You will lose all data associated with your account including songs, instruments and sections. 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button
              onClick={() => {
                handleClose();
                dispatch(deleteUser());
              }}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default UserEdit;
