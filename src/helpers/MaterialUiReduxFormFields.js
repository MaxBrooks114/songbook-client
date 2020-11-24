import React from 'react'
import { Field, reduxForm, clearFields, reset } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import RangedSlider from '../components/ui/RangedSlider';
import Select from '@material-ui/core/Select';
import { Autocomplete } from '@material-ui/lab';




export const renderTextField = ({
  helperText,
  meta: { touched, error, invalid },
  rows,
  multiline,
  inputAdornment,
  classes,
  input,
  label,
  required,
  ...custom
}) => {
  return (
    <TextField
    
      label={label}
      size="small"
      helperText={touched && error}
      error={touched && invalid}
      color="secondary"
      variant="outlined"
      margin="dense"
      required={required}
      multiline={multiline}
      rows={rows}
      autoComplete="off"
      InputProps={{
        endAdornment: <InputAdornment position="end">{inputAdornment || ''}</InputAdornment>,
        className: classes.value,
      }}
      InputLabelProps={{ className: classes.label }}
      {...input}
      {...custom}
    />
  );
};

export const renderSlider = ({
  helperText,
  meta: { touched, error, invalid },
  inputAdornment,
  classes,
  input,
  label,
  min,
  max,
  marks,
  valueLabelDisplay,
  onChange,
  ...custom
}) => {
  onChange=input.onChange
  return (
    <RangedSlider
    helperText={touched && error}
    error={touched && invalid}
    
    value={input.value}
    onChange={(e,v) => {
      input.onChange(v.value) // update redux-form value
      onChange(v.value)       // call your additional listener
    }}
    label={label}
    min={min}
    max={max}
    valueLabelDisplay={valueLabelDisplay}
    marks={marks}
    InputProps={{
      endAdornment: <InputAdornment position="end">{inputAdornment || ''}</InputAdornment>,
      className: classes.value,
    }}
    InputLabelProps={{ className: classes.label }}
    
    {...input}
    {...custom}      
    />    
    )
  }
export const renderAutoCompleteField = ({ options, classes, input, label, ...custom }) => {
    return (
      <Autocomplete
      options={options || ''}
      getOptionLabel={(option) => option[Object.keys(option)] || ''}
      classes={{ listbox: classes.listbox, input: classes.input, option: classes.option }}
      value={options.find((option) => option[Object.keys(option)] === input.value) || ''}
      renderInput={(params) => (
        <TextField
        {...params}
        label={label}
        size="small"
        color="secondary"
        variant="outlined"
        margin="dense"
        InputProps={{
          ...params.InputProps,
          className: classes.autoComplete,
          input: classes.input,
        }}
        InputLabelProps={{ className: classes.label }}
        {...input}
        {...custom}
        />
        )}
        />
        );
      };
      
export const renderAutoCompleteDataField = ({ options, classes, input, label, ...custom }) => {
        return (
          <Autocomplete
          options={options || ''}
          getOptionLabel={(option) => option}
          classes={{ listbox: classes.listbox, input: classes.input, option: classes.option }}
          value={options.find((option) => option === input.value) || ''}
          renderInput={(params) => (
            <TextField
            {...params}
            label={label}
         
            size="small"
            color="secondary"
            variant="outlined"
            margin="dense"
            InputProps={{
              ...params.InputProps,
              className: classes.autoComplete,
              input: classes.input,
            }}
            InputLabelProps={{ className: classes.label }}
            {...input}
            {...custom}
            />
            )}
            />
            );
          };
          
export const renderCheckbox = ({ classes, input, label }) => (
            <FormControlLabel
            className={classes.label}
            label={label}
            labelPlacement="start"
            control={<Checkbox checked={input.value ? true : false} onChange={input.onChange} name="original" />}
            />
            );
            
export const renderCheckboxGroup = ({ name, options, input, meta, ...custom}) => {
  let $options = Object.values(options).map((option, i) => (
    <div key={i}>
      <Checkbox
        name={`${name}[${i}]`}
        checked={input.value.indexOf(option.id) !== -1}
        label={option.label}
        onChange = {(e, checked) => {
          let newValue = [...input.value];
          if (checked){
            newValue.push(option.id);
          } else {
            newValue.splice(newValue.indexOf(option.id), 1);
          }
          return input.onChange(newValue);
        }}
        {...custom}
      />
      {option.name}
    </div>
  ));
  return (
    <div>
      {$options}
    </div>
  );
};