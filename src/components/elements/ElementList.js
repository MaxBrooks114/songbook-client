import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchElement } from '../../actions/elements';
import { getFilteredElements } from '../../selectors/elementSelectors';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import ElementCard from './ElementCard';
import ElementDetail from './ElementDetail';
import FilterControl from '../FilterControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    height: '90vh',
    paddingBottom: theme.spacing(4),
    marginBottom: theme.spacing(4),
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

const ElementList = ({ match }) => {
  const filteredElements = useSelector(getFilteredElements);
  const elements = useSelector((state) => state.elements);
  const element = useSelector((state) => state.elements[match.params.id]);

  const dispatch = useDispatch();

  const classes = useStyles();
  let transitionDuration = 50;

  const handleClick = (id) => {
    dispatch(fetchElement(id));
  };
  const renderFilter = 
  Object.values(elements).length > 0 ? <FilterControl objectType='elements' attributes={Object.getOwnPropertyNames(Object.values(elements)[0])} /> : null

  const renderedList =
    Object.values(elements).length > 0
      ? Object.values(filteredElements)
          .sort((a, b) => (a['song'] > b['song'] ? 1 : -1))
          .map((element) => {
            transitionDuration += 50;
            return (
              <ListItem key={element.id} dense>
                <ElementCard element={element} transitionDuration={transitionDuration} handleClick={handleClick} />
              </ListItem>
            );
          })
      : null;


  const renderDetail = () => {
    return element ? <ElementDetail  element={element} /> : null;
  };

  return (
    <Grid container className={classes.cardGrid}>
      <Grid item xs={12} className={classes.filter}>
        {renderFilter}
      </Grid>
      <Grid item xs={4} className={classes.list}>
        <List>{renderedList}</List>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={6} className={classes.list}>
        {renderDetail()}
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default ElementList;
