import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import history from '../../history';
import { logout } from '../../actions/auth';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  dialog: {},
}));

const Logout = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    history.push('/songs');
  };

  return (
    <div>
      <Dialog
        className={classes.dialog}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to Log out?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By logging out you will lose all access to your music until you log in again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              dispatch(logout());
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Logout;