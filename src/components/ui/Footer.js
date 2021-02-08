import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

import footerLogo from '../../assets/footerLogo.png'

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.gray,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: '60px',
    zIndex: theme.zIndex.modal + 1,
    color: theme.palette.info.main,
    clear: 'both'
  },

  logo: {
    width: '4em',
    height: '4em',
    verticalAlign: 'bottom',
    marginLeft: '1em'
  },

  copy: {
    display: 'inline-block',
    width: '210px',
    wordWrap: 'break-word',
    whiteSpace: 'normal'
  }
}))

const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
     <img src={footerLogo} alt="footer-logo" className={classes.logo}/>
     <span className={classes.copy} >SongBook by Max Brooks 2020</span>
    </footer>
  )
}

export default Footer
