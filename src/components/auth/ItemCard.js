import React from 'react'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {SET_FILTER} from '../../actions/types'



const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    color: 'black',
    height: '85%',
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
    alignItems: 'flex-start',
    position: 'relative',
    '&:hover': {
        transform: 'translate(10px, 10px)',
        transition: 'transform 0.2s ease 0s',
        cursor: 'pointer',
        zIndex: 2,
     },
  },

  media: {
    width: '100%',
    borderRadius: 4
  },
  

   link: {
    textDecoration: 'none',
    color: theme.palette.info.main
  },

  

  cardContent1: {
    color: theme.palette.info.main,
    padding: '10px',
    height: 80,   
  },

  cardContent2: {
    color: theme.palette.info.main,
    padding: '10px',
    height: 120,   
  },

  trackInfo: {
    fontWeight: '300',
    fontSize: '.8rem',
    color: theme.palette.info.main,
    boxOrient: 'vertical',
    display: '-webkit-box',
    lineClamp: '1',
    overflow: 'hidden',
    whiteSpace: 'normal'
  },

  trackTitle: {
    fontWeight: '700',
    fontSize: '.8rem',
    color: theme.palette.info.main,
    boxOrient: 'vertical',
    display: '-webkit-box',
    lineClamp: '2',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal'
  },

}));




const ItemCard = ({index, picture, album, cardTitle, cardInfo1, cardInfo2, type, id, dispatchKey, dispatchValue }) => {  

  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch()

  return (
      <Card className={classes.root} onClick={() => {
        
         history.push(`/${type}/${id}`)
        if(dispatchKey && dispatchValue) {
         
          dispatch({type: SET_FILTER, payload: {

            [dispatchKey]: dispatchValue, filter: true
        }})
       
      }
      
      }}>
        <CardMedia
        ><img className={classes.media} alt={album} src={picture}/></CardMedia>
        <div className={classes.cardBody}>
        <CardContent className={classes.cardContent1}>
              <Typography variant="h6">{index + 1}</Typography>
              <Typography className={classes.trackTitle} variant="subtitle1">
                {cardTitle}< br/>          
              </Typography>      
        </CardContent>
        
        <CardContent className={classes.cardContent2}>
          <Typography component="p" className={classes.trackInfo} variant="subtitle2">
           {cardInfo1} </Typography>
          <Typography component="p" className={classes.trackInfo} variant="subtitle2">
           {cardInfo2} </Typography>
         
        </CardContent>
        </div>
      </Card>
  )
}

export default ItemCard
