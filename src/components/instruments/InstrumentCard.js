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
    color: '#FFF',
  },
  media: {
    width: 85,
    backgroundSize: 'cover',
  },
}));

const InstrumentCard = ({ instrument, transitionDuration, handleClick }) => {
  const classes = useStyles();

  return (
    <Slide direction="up" mountOnEnter in timeout={transitionDuration}>
      <Card className={classes.root} onClick={() => handleClick(instrument.id)}>
        <CardContent className={classes.cardContent}>
          <Typography variant="subtitle1">{instrument.name}</Typography>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default InstrumentCard;
