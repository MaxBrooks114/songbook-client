import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      width: 200
  
    },
  },


}));

 const RangedSlider = ({min, max, label, marks, valueLabelDisplay, valueLabelFormat, onChange, ...other}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState([min, max]);
  const handleChange = (event, newValue, other) => {
    setValue(newValue);
    onChange(newValue)
  };
  return (
    <div className={classes.root}>
     <Typography id="range-slider" gutterBottom>{label}</Typography>
      <Slider
        className={classes.slider}
        value={value}
        {...other}
        onChange={handleChange}
        valueLabelDisplay={valueLabelDisplay}
        valueLabelFormat={valueLabelFormat}
        min={min}
        max={max}
        marks={marks}
        defaultValue={[min, max]}
        aria-labelledby="range-slider"
      />
    </div>
  );
}

export default RangedSlider