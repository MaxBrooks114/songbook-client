import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editInstrument, fetchInstrument } from '../../actions/instruments';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import InstrumentForm from './InstrumentForm';

const useStyles = makeStyles((theme) => ({
  root: {
    

    minHeight: '100vh', 
    
      [theme.breakpoints.down('xs')]: {
          minHeight: '120vh', 
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

  title: {
      color: 'white',
  }
}));

const InstrumentEdit = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInstrument(match.params.id));
  }, [dispatch, match.params.id]);

  const instrument = useSelector((state) => state.instruments[match.params.id]);

  const onSubmit = (formValues) => {
    dispatch(
      editInstrument(match.params.id, {
        ...formValues,
      })
    );
  };

  const classes = useStyles();

  const initialValues = instrument ? { ...instrument } : null;

  return (
    <div className={classes.root}>
      <div className={classes.toolbarMargin}></div>
      <Typography className={classes.title}  component="h1" variant="h2" align="center" gutterBottom>
        Edit an Instrument
      </Typography>
      <InstrumentForm initialValues={initialValues} onSubmit={onSubmit} />
    </div>
  );
};

export default InstrumentEdit;
