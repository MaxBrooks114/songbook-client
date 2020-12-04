import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(10),
    },
    position: 'fixed',
    zIndex: 1303
  },
}));

const Progressbar = () => {
  const classes = useStyles();
  const loading = useSelector((state) => state.loading.loading);

  const renderBar = () => {
    return loading ? <LinearProgress variant="indeterminate" color="secondary" /> : '';
  };

  return <div className={classes.root}>{renderBar()}</div>;
};

export default Progressbar;
