import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    display: 'flex',
    width: '95%',
    height: 85,
    paddingTop: 0,
    paddingBottom: 0,
    color: theme.palette.info.main,
    [theme.breakpoints.down('xs')]: {
      width: '100%'
  
    },
    
  },
  
  cardContent: {
    marginTop: 'auto',
    marginLeft: '.6rem'
  }
  
 
}));

const InstrumentCard = ({ instrument, transitionDuration, handleClick }) => {
  const classes = useStyles();
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const displayName = () => {
    return instrument.make && instrument.model ? 
      <>{instrument.make} {instrument.model} ({instrument.name})</> : instrument.name
    }
  return (
    <Slide direction="up" mountOnEnter in timeout={transitionDuration}>
      <Card className={classes.root} onClick={() => handleClick(instrument.id)}>
        <CardContent className={classes.cardContent}>
          <Typography component="p" style={{fontWeight: '600', verticalAlign: 'middle'}} variant={matches ? "caption" : "subtitle2"}>{displayName()} </Typography>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default InstrumentCard;
