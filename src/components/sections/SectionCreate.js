import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSection } from '../../actions/sections';
import {createFile} from '../../actions/files'
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import SectionForm from './SectionForm';
import keys from '../songs/keys';
import modes from '../songs/modes';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    minHeight: '150vh', 
      [theme.breakpoints.down('md')]: {
          minHeight: '190vh', 
      },

      [theme.breakpoints.down('sm')]: {
          minHeight: '205vh', 
      },

      [theme.breakpoints.down('xs')]: {
          minHeight: '220vh', 
      },
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },

  title: {
    color: 'white'
  }
}));

const SectionCreate = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs);
  const instruments = useSelector((state)=> state.instruments)
  const normalize = (list, v) => {
    return v ? Object.keys(list.find((value) => Object.values(value)[0] === v))[0] : null;
  };

  const songId = (title) => {
    const song = Object.values(songs).find((song) => song.title === title);
    return song.id;
  };
  const onSubmit = (formValues) => {
    if(!formValues.tempo) {
      formValues.tempo = 0
    }
    dispatch(
      createSection({
        ...formValues,
        key: normalize(keys, formValues.key),
        mode: normalize(modes, formValues.mode),
        song: songId(formValues.song),
        duration: formValues.duration * 1000,
        start: formValues.start * 1000,
        learned: !!formValues.learned
      
      })
    );
    if (formValues.recording) {
        dispatch(createFile({file: formValues.recording, extension: formValues.recording.name.split('.').slice(-1)[0], section: formValues.id, song: songId(formValues.song)})) 
    }
    if (formValues.tab) {
        dispatch(createFile({file: formValues.tab, extension: formValues.tab.name.split('.').slice(-1)[0], section: formValues.id, song: songId(formValues.song)})) 
    }
    
  };

  const classes = useStyles();

  return (
      <div  className={classes.root}>
        <div className={classes.toolbarMargin}></div>
        <Typography className={classes.title} variant="h2" align="center" gutterBottom>
          Create an Section
        </Typography>
        <SectionForm songs={songs} instruments={instruments} onSubmit={onSubmit} />
      </div>
  );
};

export default SectionCreate;
