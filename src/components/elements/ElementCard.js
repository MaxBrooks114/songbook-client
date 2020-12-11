import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.light,
    display: 'flex',
    width: '100%',
    height: 'auto',
    boxShadow: theme.shadows[24],
     [theme.breakpoints.down('sm')]: {
        textAlign: 'center'
    
      },
    '&:hover': {
      cursor: 'pointer',
    },
    color: '#FFF',

    
  },

  cardContent: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '60%',
      display: 'flex',
      flexDirection: "column",
      justifyContent: 'center',
    }
  }
  
}));

const ElementCard = ({ element, transitionDuration, handleClick }) => {
  const classes = useStyles();
  const theme = useTheme()

  return (
    <Slide direction="up" mountOnEnter in timeout={transitionDuration}>
      <Card className={classes.root} onClick={() => handleClick(element.id)}>
        <CardContent className={classes.cardContent}>
          <Typography display="block" variant="subtitle1">{element.name}</Typography>
          <Typography display="block" variant="caption">{element.song.title}</Typography>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default ElementCard;
