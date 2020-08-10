import React from 'react';
import { useDispatch } from 'react-redux';
import { createSong } from '../../actions/songs';
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

const SongCreate = () => {
  const dispatch = useDispatch();

  const normalize = (list, v) => {
    return v ? Object.keys(list.find((value) => Object.values(value)[0] === v))[0] : null;
  };

  const onSubmit = (formValues) => {
    dispatch(
      createSong({
        ...formValues,
        key: normalize(keys, formValues.key),
        mode: normalize(modes, formValues.mode),
      })
    );
  };

  const classes = useStyles();

  return (
    <>
      <div className={classes.toolbarMargin}></div>
      <div>
        <Typography className={classes.root} component="h1" variant="h2" align="center" gutterBottom>
          Create a Song
        </Typography>
        <SongForm onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default SongCreate;
