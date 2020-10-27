import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createElement } from '../../actions/elements';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import ElementForm from './ElementForm';
import keys from '../songs/keys';
import modes from '../songs/modes';

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

const ElementCreate = () => {
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
    dispatch(
      createElement({
        ...formValues,
        key: normalize(keys, formValues.key),
        mode: normalize(modes, formValues.mode),
        song: songId(formValues.song),
        learned: !!formValues.learned
      
      })
    );
    
  };

  const classes = useStyles();

  return (
    <>
      <div className={classes.toolbarMargin}></div>
      <div>
        <Typography className={classes.root} component="h1" variant="h2" align="center" gutterBottom>
          Create an Element
        </Typography>
        <ElementForm songs={songs} instruments={instruments} onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default ElementCreate;
