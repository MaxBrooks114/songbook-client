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
import Accordion from '@material-ui/core/Accordion';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm'
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
  },

  delete: {
    background: `linear-gradient(360deg, ${theme.palette.error.light} 0%,  ${theme.palette.error.main} 80%)`,
    '&:hover': {
      background: 'rgba(8,199,251,1)',
      color: 'rgba(86,3,114,1)',
      display: 'absolute',
    }
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
    <>
      <div className={classes.toolbarMargin}></div>
      <div>
        <Typography className={classes.root} variant="h2" align="center" gutterBottom>
          Edit Your Information
        </Typography>
        <LoginForm onSubmit={onSubmit} />
        <Grid container justify="space-between" className={classes.buttonContainer}>
            <Button className={classes.delete} onClick={handleClickOpen}>
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
              You will lose all data associated with your account including songs, instruments and elements. 
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
    </>
  );
};

export default UserEdit;
