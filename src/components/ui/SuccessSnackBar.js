import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { Link } from 'react-router-dom';
import { clearSnackbar } from '../../actions/ui';
import { makeStyles } from '@material-ui/styles';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    textTransform: 'capitalize',
    color: theme.palette.common.gray,
    position: 'fixed',
  },
}));

export default function SuccessSnackbar() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { successSnackbarMessage, successSnackbarOpen, songId } = useSelector((state) => state.snackbar);

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={successSnackbarOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      aria-describedby="client-snackbar"
    >
      <Alert onClose={handleClose} className={classes.root} severity="success">
        {successSnackbarMessage}< br/>
        {songId ? 
        <Link to={`/songs/${songId}`}>Check it out!</Link> : '' }
      </Alert>
    </Snackbar>
  );
}
