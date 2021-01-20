import { useReactMediaRecorder } from "react-media-recorder";
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import React from 'react'
import { makeStyles } from '@material-ui/styles';
import './recordview.css'


const useStyles = makeStyles((theme) => ({

  recordButton: {
      color: theme.palette.common.orange,
     
      
  },




       '@keyframes flicker': {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0.4,
          },
        },
        flicker: {
          animationName: '$flicker',
          animationDuration: '250ms',
          animationIterationCount: 'infinite',
          animationDirection: 'alternate',
          animationTimingFunction: 'ease-in-out',
        },
       
      
  

 


}))
const RecordView = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ video: false });
  const classes = useStyles()
  return (
    <div className="recorder">
      <p>{status}</p>
      {status !== "recording" ? <IconButton><FiberManualRecordRoundedIcon className={classes.recordButton} onClick={startRecording}/></IconButton> :
      <IconButton><FiberManualRecordRoundedIcon className={clsx(classes.recordButton, {[classes.flicker]: status === "recording"})} onClick={stopRecording} /></IconButton>}
      <audio src={mediaBlobUrl} controls autoplay loop />
    </div>
  );
};


export default RecordView