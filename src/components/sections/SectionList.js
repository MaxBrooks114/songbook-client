import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SectionCard from './SectionCard';
import { useDispatch } from 'react-redux';
import {fetchSection } from '../../actions/sections';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Sort from '../Sort'


const useStyles = makeStyles((theme) => ({

  list: {
    paddingTop: 0,
    minHeight: '100vh',
    height: '80%',
    overflow: 'scroll',
    borderRadius: '4px',
   
  },



  listItem: {
      '&:hover': {
        transform: 'translate(10px, 10px)',
        transition: 'transform 0.2s ease 0s',
        cursor: 'pointer',
        zIndex: 2,
     },
  
     
    },
    
    title: {
      width: '95%',
      fontWeight: '600',
      textAlign: 'center',
       [theme.breakpoints.down('xs')]: {
         margin: 0,
         width: '100%'
      },  
    },
}));
const SectionList = ({sections, filteredSections, fullDisplay, transitionDuration, height }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleClick = (id) => {
    dispatch(fetchSection(id));
  };

  const renderSort = () => {
    return Object.values(sections).length > 0 ? <Sort items={Object.values(sections)} sections={Object.values(sections)} objectType='sections' /> : null 
  }

const renderedList = () => {
   return Object.values(sections).length > 0
      ? filteredSections.map((section) => {
            transitionDuration += 50;
            return (

              <ListItem className={classes.listItem} key={section.id} disableGutters dense>
                <SectionCard fullDisplay={fullDisplay} section={section} transitionDuration={transitionDuration} handleClick={handleClick} />
              </ListItem>
            );
          })
      : null;
    }


   return (
      <>
        <Typography variant="h5" className={classes.title}>
          Sections
        </Typography>
        {renderSort()}     
        <List className={classes.list} style={{height: height}}>
          {renderedList()}
        </List> 
      </>
   )
}

export default React.memo(SectionList)
