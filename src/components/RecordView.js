import { useReactMediaRecorder } from "react-media-recorder";
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import IconButton from '@material-ui/core/IconButton';
import React from 'react'
import { makeStyles } from '@material-ui/styles';
import './recordview.css'


const useStyles = makeStyles((theme) => ({

  recordButton: {
      color: theme.palette.common.red,
      '&:hover': {
        color: theme.palette.common.red,
      },
  },

  stopRecordingButton: {
     color: theme.palette.primary.main,
     background: theme.palette.common.red,
      '&:hover': {
        color: theme.palette.common.red,
      },
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
      <IconButton><HighlightOffRoundedIcon className={classes.stopRecordButton} onClick={stopRecording} /></IconButton>}
      <audio src={mediaBlobUrl} controls autoplay loop />
    </div>
  );
};


export default RecordView