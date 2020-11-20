import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

 const RangedSlider = ({min, max, label, marks, valueLabelDisplay, onChange, ...other}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState([min, max]);
  const handleChange = (event, newValue, other) => {
    setValue(newValue);
    onChange(newValue)
  };
  return (
    <>
     <Typography id="range-slider" gutterBottom>{label}</Typography>
      <Slider
        className={classes.root}
        value={value}
        {...other}
        onChange={handleChange}
        valueLabelDisplay={valueLabelDisplay}
        min={min}
        max={max}
        marks={marks}
        defaultValue={[min, max]}
        aria-labelledby="range-slider"
        
   
      />
    </>
  );
}

export default RangedSlider