import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.light,
    display: 'flex',
    width: '100%',
    height: 'auto',
    boxShadow: theme.shadows[24],
    '&:hover': {
      cursor: 'pointer',
    },
     [theme.breakpoints.down('sm')]: {
        textAlign: 'center'
    
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

const SectionCard = ({ section, transitionDuration, handleClick }) => {
  const classes = useStyles();

  return (
    <Slide direction="up" mountOnEnter in timeout={transitionDuration}>
      <Card className={classes.root} onClick={() => handleClick(section.id)}>
        <CardContent className={classes.cardContent}>
          <Typography  variant="subtitle1">{section.name}</Typography>
          <Typography  variant="caption">{section.song.title}</Typography>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default SectionCard;
