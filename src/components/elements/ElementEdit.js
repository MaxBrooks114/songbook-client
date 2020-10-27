import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editElement, fetchElement } from '../../actions/elements';
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

const ElementEdit = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchElement(match.params.id));
  }, [dispatch, match.params.id]);

  const element = useSelector((state) => state.elements[match.params.id]);
  const songs = useSelector((state) => state.songs);
  const instruments = useSelector((state) => state.instruments);

  const onSubmit = (formValues) => {
    dispatch(
      editElement(match.params.id, {
        ...formValues,
        key: normalize(keys, formValues.key),
        mode: normalize(modes, formValues.mode),
        song: songId(formValues.song),
        learned: !!formValues.learned
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

  const songId = (title) => {
    const song = Object.values(songs).find((song) => song.title === title);
    return song.id;
  };

  const renderTitle = () => {
    return element.song.title;
  };

  const initialValues = element
    ? { ...element, key: renderText(keys, element.key), mode: renderText(modes, element.mode), song: renderTitle() }
    : null;

  return (
    <>
      <div className={classes.toolbarMargin}></div>
      <Typography className={classes.root} component="h1" variant="h2" align="center" gutterBottom>
        Edit an Element
      </Typography>
      <ElementForm initialValues={initialValues} instruments={instruments} songs={songs} onSubmit={onSubmit} />
    </>
  );
};

export default ElementEdit;
