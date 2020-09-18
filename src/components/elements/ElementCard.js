import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
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
    color: '#FFF',
  },
  media: {
    width: 85,
    backgroundSize: 'cover',
  },
}));

const ElementCard = ({ element, transitionDuration, handleClick }) => {
  const classes = useStyles();
  const song = useSelector((state) => state.songs[element.song]);
  return (
    <Slide direction="up" mountOnEnter in timeout={transitionDuration}>
      <Card className={classes.root} onClick={() => handleClick(element.id)}>
        <CardContent className={classes.cardContent}>
          <Typography variant="subtitle1">{element.name}</Typography>
          <Typography variant="subtitle1">{song.title}</Typography>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default ElementCard;
