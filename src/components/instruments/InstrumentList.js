import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInstruments, fetchInstrument } from '../../actions/instruments';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import InstrumentCard from './InstrumentCard';
import InstrumentDetail from './InstrumentDetail';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    height: 640,
    paddingBottom: theme.spacing(4),
  },

  list: {
    height: '100%',
    overflow: 'scroll',
  },

  filter: {
    marginRight: 14,
    marginLeft: 14,
    background: theme.palette.primary.light,
    borderRadius: '0 0 8px 8px',
  },
}));

const InstrumentList = ({ match }) => {
  const instruments = useSelector((state) => state.instruments);

  const instrument = useSelector((state) => state.instruments[match.params.id]);

  const dispatch = useDispatch();

  const classes = useStyles();
  let transitionDuration = 50;

  const handleClick = (id) => {
    dispatch(fetchInstrument(id));
  };

  const renderedList =
    Object.values(instruments).length > 0
      ? Object.values(instruments)
          .sort((a, b) => (a['name'] > b['name'] ? 1 : -1))
          .map((instrument) => {
            transitionDuration += 50;
            return (
              <ListItem key={instrument.id} dense>
                <InstrumentCard
                  instrument={instrument}
                  transitionDuration={transitionDuration}
                  handleClick={handleClick}
                />
              </ListItem>
            );
          })
      : null;

  const renderDetail = () => {
    return instrument ? <InstrumentDetail instrument={instrument} /> : null;
  };

  return (
    <Grid container className={classes.cardGrid}>
      <Grid item xs={2} className={classes.list}>
        <List>{renderedList}</List>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={4} className={classes.list}>
        {renderDetail()}
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default InstrumentList;
