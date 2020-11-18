import React from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Countdown from './Countdown'
const useStyles = makeStyles((theme) => ({

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },

}));




const BackDrop = ({show}) => {

  const classes = useStyles();
  
  const renderCounter = () => {
    return show ? <Countdown/> : ""
  }
  return (
    <>
       <Backdrop className={classes.backdrop} open={show}>
            <Typography>Playing in {renderCounter()}</Typography>
        </Backdrop>
    </>
  )
}

export default BackDrop
