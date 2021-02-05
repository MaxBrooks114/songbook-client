import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSection, fetchSection } from '../../actions/sections';
import {createFile} from '../../actions/files'
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import SectionForm from './SectionForm';
import keys from '../songs/keys';
import modes from '../songs/modes';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.info.main,
    width: '50%',
    margin: 'auto',
    padding: '2rem',
    boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
     [theme.breakpoints.down('md')]: {
      width: '75%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
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

  container: {
      minHeight: '150vh',
    [theme.breakpoints.down('md')]: {
       minHeight: '180vh',
    },

    [theme.breakpoints.down('sm')]: {
       minHeight: '200vh',
    },

  },

  title: { fontSize: '2.8rem', fontWeight: 600,
    color: theme.palette.info.main
  }
}));

const SectionEdit = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSection(match.params.id));
  }, [dispatch, match.params.id]);

  const section = useSelector((state) => state.sections[match.params.id]);
  const songs = useSelector((state) => state.songs);
  const instruments = useSelector((state) => state.instruments);

  const onSubmit = (formValues) => {
    if(!formValues.tempo) {
      formValues.tempo = 0
    }
    dispatch(
      editSection(match.params.id, {
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
    return section.song.title;
  };

  const initialValues = section
    ? { ...section, start: section.start/1000, duration: section.duration/1000, key: renderText(keys, section.key), mode: renderText(modes, section.mode), song: renderTitle() }
    : null;

  return (
    <div className={classes.container}>
      <div className={classes.toolbarMargin}></div>
      <div  className={classes.root}>
      <Typography className={classes.title} component="h1" variant="h2" align="center" gutterBottom>
        Edit an Section
      </Typography>
      <SectionForm initialValues={initialValues} instruments={instruments} songs={songs} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default SectionEdit;
