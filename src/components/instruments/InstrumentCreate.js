import React from 'react';
import { useDispatch } from 'react-redux';
import { createInstrument } from '../../actions/instruments';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import InstrumentForm from './InstrumentForm';

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

  title: {
    color: theme.palette.info.main,
    textAlign: "center",
    width: '100%',
      wordWrap: 'break-word', 
      whiteSpace: 'normal',
     [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
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

const InstrumentCreate = () => {
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(
      createInstrument({
        ...formValues,
        sections: []
      })
    );
  };

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.toolbarMargin}></div>
      <div className={classes.root}>
        <Typography className={classes.title} component="h1" variant="h2" align="center" gutterBottom>
          Add an Instrument
        </Typography>
         <Typography  variant="subtitle2" align="center" gutterBottom>
            Adding an instrument let's you associate it with any section. If you are a multi-instrumentalist this is a good way to keep track of what section you know on which instrument.
          </Typography>
        <InstrumentForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default InstrumentCreate;
