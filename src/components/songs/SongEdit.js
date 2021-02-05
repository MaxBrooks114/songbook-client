import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSong, fetchSong } from '../../actions/songs';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import SongForm from './SongForm';
import keys from './keys';
import modes from './modes';

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

    title: { fontSize: '2.8rem', fontWeight: 600,
      color: theme.palette.info.main,
     
    container: {
      minHeight: '110vh',
       [theme.breakpoints.down('md')]: {
          minHeight: '100vh', 
      },

      [theme.breakpoints.down('sm')]: {
          minHeight: '180vh', 
      },
    }
  }, 
}));

const SongEdit = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSong(match.params.id));
  }, [dispatch, match.params.id]);

  const song = useSelector((state) => state.songs[match.params.id]);

  const onSubmit = (formValues) => {
    dispatch(
      editSong(match.params.id, {
        ...formValues,
        key: normalize(keys, formValues.key),
        mode: normalize(modes, formValues.mode),
      })
    );
  };

  const classes = useStyles();

  const normalize = (list, v) => {
    return v ? Object.keys(list.find((value) => Object.values(value)[0] === v))[0] : null;
  };
  const renderText = (list, v) => {
    return v || v === 0 ? list.find((k) => k[v])[v] : null;
  };

  const initialValues = song ? { ...song, key: renderText(keys, song.key), mode: renderText(modes, song.mode) } : null;

  return (
    <div className={classes.container}>
      <div className={classes.toolbarMargin}></div>
      <div className={classes.root}>
        <Typography className={classes.title} component="h1" variant="h2" align="center" gutterBottom>
          Edit a Song
        </Typography>
        <SongForm initialValues={initialValues} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default SongEdit;
