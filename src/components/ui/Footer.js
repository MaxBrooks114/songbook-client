import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import footer_logo from '../../assets/footer_logo.png'

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    position: 'absolute',
    marginTop:"calc(5% +60px)",
    bottom: 0,
    color: theme.palette.info.main,
    zIndex: theme.zIndex.modal+1
  
  },

  logo: {
    width: "5em",
    height: "5em",
    verticalAlign: 'bottom',
    marginLeft:'1em'
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <img alt="logo" className={classes.logo} src={footer_logo} />
        SongBook by Max Brooks 2020
    </footer>
    )
};

export default Footer;
