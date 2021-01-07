import React, { useRef } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import RangedSlider from '../components/ui/RangedSlider';
import MenuItem from '@material-ui/core/MenuItem';
import { Autocomplete } from '@material-ui/lab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {titleCase} from './detailHelpers'




const adaptFileEventToValue = delegate => e => {
  delegate(e.target.files[0])
};

export const FileInput = ({ 
  label,
  classes,
  input: { value: omitValue, onChange, onBlur, ...inputProps }, 
  meta: omitMeta, 
  ...props 
}) => {
  const inputFileRef = useRef( null );
  return (
    <Button 
      startIcon={<CloudUploadIcon />}
      onClick={() => inputFileRef.current.click()}
      className={classes.uploadButton}
      >
       {label}
      <input 
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        hidden
        ref={inputFileRef}
        type="file"
        {...props.input}
        {...props} 
      />
      
  </Button>
   
  );
};


export const renderTextField = ({
  helperText,
  meta: { touched, error, invalid },
  rows,
  multiline,
  inputAdornment,
  classes,
  input,
  label,
  type,
  options,
  select,
  fullWidth,
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
      select={select}
      required={required}
      multiline={multiline}
      type={type}
      rows={rows}
      options={options}
      fullWidth={fullWidth}
      autoComplete="off"
      classes={{ menu: classes.listbox, input: classes.input, menuItem: classes.option }}
      InputProps={{
        endAdornment: <InputAdornment position="end">{inputAdornment || ''}</InputAdornment>,
        className: classes.input,
       
      }}
      InputLabelProps={{ className: classes.label}}
      SelectProps={{
          MenuProps: {
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center"
            },
             transformOrigin: {
                vertical: "top",
                horizontal: "center"
              },
            getContentAnchorEl: null,
            className: classes.listbox
          }
        }}
      {...input}
      {...custom}
    >{select ? options.map(option => <MenuItem className = {classes.option} value={option}>{titleCase(option)}</MenuItem>) : null}</TextField>
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
  valueLabelFormat,
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
    valueLabelFormat={valueLabelFormat}
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
export const renderAutoCompleteField = ({ options, classes, input, label, fullWidth, ...custom }) => {
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
        color="secondary"
        variant="outlined"
        margin="dense"
        fullWidth={fullWidth}
        InputProps={{
          ...params.InputProps,
          className: classes.listbox,
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


export const renderAutoCompleteDataField = ({ options, renderOption, getOptionLabel, classes, input, onChange, label, fullWidth, ...custom }) => {
        return (
          <Autocomplete
          options={options || ''}
          getOptionLabel={getOptionLabel}
          renderOption= {renderOption}
          onSelect={onChange}
          classes={{ listbox: classes.listbox, input: classes.input, option: classes.option }}
          value={options.find((option) => option === input.value) || ''}
          renderInput={(params) => (
            <TextField
            {...params}
            label={label}
            size="small"
            color="secondary"
            variant="outlined"
            fullWidth={fullWidth}
            InputProps={{
              ...params.InputProps,
              className: classes.listbox,
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
          
export const renderRadioGroup = ({input, classes, title, label1, label2 }) => (
            <FormControl component="fieldset">
              <FormLabel component="legend">{title}</FormLabel>
              <RadioGroup row {...input} aria-label={label1}>
                  <FormControlLabel className={classes.label} value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel className={classes.label} value='false' control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
        );

export const renderCheckbox = ({ classes, input, label, name }) => (
            <FormControlLabel
            className={classes.label}
            label={label}
            labelPlacement="start"
            control={<Checkbox checked={input.value ? true : false} onChange={input.onChange} name={name} />}
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