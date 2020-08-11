import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    position: 'fixed',
  },
}));

const Progressbar = () => {
  const classes = useStyles();
  const progressbarOpen = useSelector((state) => state.loading.progressbarOpen);

  const renderBar = () => {
    return progressbarOpen ? <LinearProgress variant="indeterminate" color="secondary" /> : '';
  };

  return <div className={classes.root}>{renderBar()}</div>;
};

export default Progressbar;