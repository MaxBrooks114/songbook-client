import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.gray,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: '60px',
    zIndex: theme.zIndex.modal+1,
    color: theme.palette.info.main,
  
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
     
        SongBook by Max Brooks 2020
    </footer>
    )
};

export default Footer;
