import React from 'react';
import { useDispatch } from 'react-redux';
import { createInstrument } from '../../actions/instruments';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import InstrumentForm from './InstrumentForm';

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

const InstrumentCreate = () => {
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(
      createInstrument({
        ...formValues,
      })
    );
  };

  const classes = useStyles();

  return (
    <>
      <div className={classes.toolbarMargin}></div>
      <div>
        <Typography className={classes.root} component="h1" variant="h2" align="center" gutterBottom>
          Add an Instrument
        </Typography>
        <InstrumentForm onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default InstrumentCreate;
