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
    color: 'white',
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    // marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
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
  console.log(initialValues);

  return (
    <>
      <div className={classes.toolbarMargin}></div>
      <Typography className={classes.root} component="h1" variant="h2" align="center" gutterBottom>
        Edit a Song
      </Typography>
      <SongForm initialValues={initialValues} onSubmit={onSubmit} />
    </>
  );
};

export default SongEdit;
