import React from 'react'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { Link, useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    color: 'black',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[24],
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
    width: 203,
    height: 209,
    borderRadius: 4
  },
  

   link: {
    textDecoration: 'none',
    color: theme.palette.info.main
  },

  

  cardContent: {
    color: theme.palette.info.main,
    padding: '10px',
    height: '85px',   
  },

  trackInfo: {
    fontWeight: '300',
    fontSize: '.8rem',
    color: theme.palette.info.main,
    boxOrient: 'vertical',
    display: '-webkit-box',
    lineClamp: '2',
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




const ItemCard = ({index, picture, album, cardTitle, cardInfo1, cardInfo2, type, id }) => {  

  const classes = useStyles();
  const history = useHistory()


  return (
      <Card className={classes.root} onClick={() => history.push(`/${type}/${id}`)}>
        <CardMedia
        ><img className={classes.media} alt={album} src={picture}/></CardMedia>
        <div className={classes.cardBody}>
        <CardContent className={classes.cardContent}>
              <Typography variant="h6">{index + 1}</Typography>
              <Typography className={classes.trackTitle} variant="subtitle1">
                {cardTitle}< br/>          
              </Typography>      
        </CardContent>
         {/* <div id="spacer" style={{width: "200px", height: '12px', float: "left", display:"inline-block"}} />  */}
        
        <CardContent className={classes.cardContent}>
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