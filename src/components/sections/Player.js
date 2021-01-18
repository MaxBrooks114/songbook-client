import React from 'react'
import AudioPlayer from 'material-ui-audio-player';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({

  root: {
      margin: 0,
      background: theme.palette.primary.main,
      color: theme.palette.info.main,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
       
        '& .makeStyles-sliderContainerWrapper-118': {
             alignItems: 'center',
        }
      },
      
  },

    playIcon: {
      color: theme.palette.info.main,
      "&:hover": {
        color: theme.palette.common.gray
      },

       [theme.breakpoints.down('sm')]: {
          height: '32px',
          width: '32px'
      },
    },

      pauseIcon: {
      color: theme.palette.info.main,
       "&:hover": {
        color: theme.palette.common.gray
      },
      [theme.breakpoints.down('sm')]: {
          height: '32px',
          width: '32px'
      },
    },

     loopIcon: {
      color: theme.palette.info.main,
       "&:hover": {
        color: theme.palette.common.gray
      },
      [theme.breakpoints.down('sm')]: {
          height: '32px',
          width: '32px'
      },
  
    },

    volumeIcon: {
      color: theme.palette.info.main,
       "&:hover": {
        color: theme.palette.common.gray
      },
      [theme.breakpoints.down('sm')]: {
          height: '32px',
          width: '32px'
      },
    },

    replayIcon: {
       "&:hover": {
        color: theme.palette.common.gray
      },
     [theme.breakpoints.down('sm')]: {
          height: '32px',
          width: '32px'
      },
    },
  
    volumeSlider: {
      [theme.breakpoints.down('sm')]: {
          height: '32px',
          width: '32px'
      },
    },
    progressTime: {
     [theme.breakpoints.down('sm')]: {
          fontSize: '.67rem',
           alignItems: 'center'
      },
    },

    mainSlider: {
      [theme.breakpoints.down('sm')]: {
          fontSize: '.67rem',
           alignItems: 'center'
      },
    }
}))


const Player = ({src}) => {
  return (
    
      <AudioPlayer
    rounded
    useStyles={useStyles}
    src={src}
    loop={true}
  />

  )
}

export default Player
