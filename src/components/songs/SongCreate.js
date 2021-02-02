import React from 'react';
import { useDispatch } from 'react-redux';
import { createSong } from '../../actions/songs';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import SongForm from './SongForm';
import keys from './keys';
import modes from './modes';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.info.main,
    width: '50%',
    margin: 'auto',
    padding: '2rem',
    boxShadow: '6px 6px 6px rgba(0,0,0,0.2)',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4,
    [theme.breakpoints.down('md')]: {
      width: '75%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
     
  },


  title: {
      color: theme.palette.info.main,

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
      minHeight: '110vh',
    [theme.breakpoints.down('md')]: {
       minHeight: "100vh",
    },
    [theme.breakpoints.down('sm')]: {
       minHeight: '180vh',
    },

  },
}));

const SongCreate = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const normalize = (list, v) => {
    return v ? Object.keys(list.find((value) => Object.values(value)[0] === v))[0] : null;
  };

  const onSubmit = (formValues) => {
    
    if(formValues.key){
      formValues.key = normalize(keys, formValues.key)
    } 
    if(formValues.mode) {
      formValues.mode = normalize(modes, formValues.mode)
    }

    dispatch(
      createSong({
        ...formValues,
        sections: []
      })
    );
  };


  return (
    <div className={classes.container}>
      <div className={classes.toolbarMargin}></div>
      <div className={classes.root}>

          <Typography className={classes.title}  variant="h2" align="center"  gutterBottom>
            Create a Song
          </Typography>
          <Typography className={classes.title}  variant="subtitle2" align="center" gutterBottom>
            This is the manual way to add a song. Most useful for original songs, you will not be able to use the Spotify Player feature using this method of song creation. 
          </Typography>
      
          <SongForm onSubmit={onSubmit} />
    </div>
    </div>
  );
};

export default SongCreate;
