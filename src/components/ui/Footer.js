import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.dark,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: theme.spacing(4),
    marginBottom: 0,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return <footer className={classes.footer}>SongBook by Max Brooks 2020</footer>;
};

export default Footer;
