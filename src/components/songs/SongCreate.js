import React from 'react';
import { useDispatch } from 'react-redux';
import { createSong } from '../../actions/songs';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SongForm from './SongForm';
import keys from './keys';
import modes from './modes';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
      minHeight: '110vh', 
      [theme.breakpoints.down('md')]: {
          minHeight: '150vh', 
      },

      [theme.breakpoints.down('sm')]: {
          minHeight: '165vh', 
      },

      [theme.breakpoints.down('xs')]: {
          minHeight: '180vh', 
      },
  },


  title: {
      color: 'white',
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
}));

const SongCreate = () => {
  const dispatch = useDispatch();
  const theme = useTheme()
  const classes = useStyles();

  const normalize = (list, v) => {
    return v ? Object.keys(list.find((value) => Object.values(value)[0] === v))[0] : null;
  };

  const onSubmit = (formValues) => {


    dispatch(
      createSong({
        ...formValues,
        key: normalize(keys, formValues.key),
        mode: normalize(modes, formValues.mode),
        elements: []
      })
    );
  };


  return (
    <div className={classes.root}>
      <div className={classes.toolbarMargin}></div>

          <Typography className={classes.title}  variant="h2" align="center" gutterBottom>
            Create a Song
          </Typography>
      
          <SongForm onSubmit={onSubmit} />
    
    </div>
  );
};

export default SongCreate;
