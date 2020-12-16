import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editElement, fetchElement } from '../../actions/elements';
import {createFile} from '../../actions/files'
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import ElementForm from './ElementForm';
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

const ElementEdit = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchElement(match.params.id));
  }, [dispatch, match.params.id]);

  const element = useSelector((state) => state.elements[match.params.id]);
  const songs = useSelector((state) => state.songs);
  const instruments = useSelector((state) => state.instruments);

  const onSubmit = (formValues) => {
    if(!formValues.tempo) {
      formValues.tempo = 0
    }
    dispatch(
      editElement(match.params.id, {
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
        dispatch(createFile({file: formValues.recording, extension: formValues.recording.name.split('.').slice(-1)[0], element: formValues.id, song: songId(formValues.song)})) 
    }
    if (formValues.tab) {
        dispatch(createFile({file: formValues.tab, extension: formValues.tab.name.split('.').slice(-1)[0], element: formValues.id, song: songId(formValues.song)})) 
    }
    
  };

  const classes = useStyles();

  const normalize = (list, v) => {
    return v ? Object.keys(list.find((value) => Object.values(value)[0] === v))[0] : null;
  };
  const renderText = (list, v) => {
    return v || v === 0 ? list.find((k) => k[v])[v] : null;
  };

  const songId = (title) => {
    const song = Object.values(songs).find((song) => song.title === title);
    return song.id;
  };

  const renderTitle = () => {
    return element.song.title;
  };

  const initialValues = element
    ? { ...element, start: element.start/1000, duration: element.duration/1000, key: renderText(keys, element.key), mode: renderText(modes, element.mode), song: renderTitle() }
    : null;

  return (
    <div  className={classes.root}>
      <div className={classes.toolbarMargin}></div>
      <Typography className={classes.title} component="h1" variant="h2" align="center" gutterBottom>
        Edit an Element
      </Typography>
      <ElementForm initialValues={initialValues} instruments={instruments} songs={songs} onSubmit={onSubmit} />
    </div>
  );
};

export default ElementEdit;
