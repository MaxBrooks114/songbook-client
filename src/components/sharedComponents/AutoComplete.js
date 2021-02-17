import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import { Autocomplete } from '@material-ui/lab'


const AutoComplete = ({ options, nonfilter, renderOption, getOptionLabel, classes, input, onChange, label, fullWidth, defaultValue, ...custom }) => {

  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState("");
  console.log(value)
  console.log(inputValue)
    return (
            <Autocomplete
              options={options}
              getOptionLabel={getOptionLabel}
              renderOption= {renderOption}
              onChange={(event, newValue) => {
                setValue(newValue);  
               
              }}
              value={value}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              // defaultValue={defaultValue}
              // //controls the component with redux form 
              // value={!defaultValue ? (options.find((option) => option === input.value) || '') : options.find((option) => option === input.value) || defaultValue}
              classes={{ listbox: classes.listbox, input: classes.input, option: classes.option }}
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
                    input: classes.input
                  }}
                  InputLabelProps={{ className: classes.label }}
                  {...input}
                  {...custom}
                />
              )}
            />
      )
}

export default AutoComplete
