import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editInstrument, fetchInstrument } from '../../actions/instruments';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import InstrumentForm from './InstrumentForm';

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
    <div className={classes.container}>
      <div className={classes.toolbarMargin}></div>
      <div className={classes.root}>
        <Typography className={classes.title}  component="h1" variant="h2" align="center" gutterBottom>
          Edit an Instrument
        </Typography>
        <InstrumentForm initialValues={initialValues} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default InstrumentEdit;
