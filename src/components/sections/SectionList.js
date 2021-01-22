import React, {useState} from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SectionCard from './SectionCard';
import { useDispatch } from 'react-redux';
import {fetchSection } from '../../actions/sections';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Sort from '../Sort'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import IconButton from '@material-ui/core/IconButton';
import { useHistory, useLocation } from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

  list: {
    paddingTop: 0,
    minHeight: '100vh',
    height: '80%',
    overflow: 'scroll',
    borderRadius: '4px',
   
  },



  listItem: {
      display: 'block',
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

    sortBar: {
      width: '95%',
      display: 'flex',
      justifyContent: 'flex-end' 
    },

    accordion: {
    width: '95%',
    background: theme.palette.primary.light,
    color: theme.palette.info.main,
    borderRadius: 4,
    margin: '1rem 0',
     '&:hover': {
        transform: 'translate(10px, 10px)',
        transition: 'transform 0.2s ease 0s',
        cursor: 'pointer',
        zIndex: 2,
     },
    '& .MuiAccordionSummary-content': {
      flexGrow: 0,
    },

    '& .MuiAccordionSummary-root': {
      justifyContent: 'space-between',
      padding: '0, 16'
    },

    '& .MuiAccordionDetails-root': {
      display: 'block',
      padding: 0,
      marginBottom: theme.spacing(2)
    },  

    '& .MuiGrid-grid-xs-10': {
      margin: 0,
      justifyContent: 'center'
    }
  },


  media: {
    width: 85,
    height: 85,
    marginRight: 12,
    objectFit: 'fill',
    borderRadius: '4px',
    [theme.breakpoints.down('md')]: {
      width: 0
  
    },
    [theme.breakpoints.down('sm')]: {
      width: 85,
       objectFit: 'contain',
    },
    [theme.breakpoints.down('sm')]: {
      width: 0,
      
    },
  },

  songTitle: {
    margin: 'auto',
    fontWeight: '600',
    color: theme.palette.info.main
  },

  songLink: {
    color: theme.palette.info.main,
    "&:hover": {
      color: theme.palette.primary.dark
    }
  }

  
}));
const SectionList = ({sections, filteredSections, fullDisplay, transitionDuration, height, orderedSongs }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory()
    const location = useLocation()
    const [expanded, setExpanded] = useState(false)

    const handleClick = (id) => {
    dispatch(fetchSection(id));
  };


  
  const renderSort = () => {
    return Object.values(sections).length > 0 ? <Sort items={Object.values(sections)} sections={Object.values(sections)} objectType='sections' /> : null 
  }

  let renderSongTitle = (song, expanded, sections) => {
    return expanded ? <Typography className={classes.songTitle} component="p"><Link className={classes.songLink} style={{textDecoration: "none"}} to={`/songs/${song.id}`}>{song.title} ({sections.length})</Link></Typography> : 
      <Typography className={classes.songTitle} component="p">{song.title} ({sections.length})</Typography> 
  }
    const renderSongs = () => {
      
      return orderedSongs.length ?
        orderedSongs.map((song) => {
          let sections = filteredSections.filter(section => song.id === section.song.id )
          return  sections.length ? 
              ( 
                <Accordion className={classes.accordion} onChange={(event, expanded) => {
                   setExpanded(expanded)
                }}>        
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <img
                        alt={song.album}
                        className={classes.media}
                        src={song.image ? song.image : 'https://coverfiles.alphacoders.com/796/79685.jpg'}
                      />   
                     {renderSongTitle(song, expanded, sections)}
                    </AccordionSummary>
                    <AccordionDetails>
                        {renderedList(sections)}
                    </AccordionDetails>
                  </Accordion> 
            ) : null
          }) 
      : null;
  }

const renderedList = (sections) => {
   return sections.length > 0 
      ? sections.map((section) => {
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
        <div className={classes.sortBar}>
          {renderSort()}
          {location.pathname.includes('sections/') ?
          <IconButton>
            <NavigateNextIcon onClick={(event) =>  history.push('/sections')}/>
          </IconButton>: null}    
        </div>
        <List className={classes.list} style={{height: height}}>
          {renderSongs()}
        </List> 
      </>
   )
}

export default React.memo(SectionList)
