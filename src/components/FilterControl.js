import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter, clearFilter } from '../actions/filter';
import { Field, reduxForm, clearFields, reset } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import RangedSlider from './ui/RangedSlider';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import keys from '../components/songs/keys'
import modes from '../components/songs/modes'
import InputLabel from '@material-ui/core/InputLabel';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import {renderText, normalize} from '../helpers/detailHelpers'
import _ from 'lodash'

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    color: '#fff',
    marginLeft: 14,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.common.pastelPurple,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.common.neonBlue,
      },
    },
  },

  select: {
    height: 40,
  },

  button: {
    color: 'white',
    background: 'linear-gradient(90deg, rgba(8,199,251,1) 0%,  rgb(254,123,235, 1) 150%)',

    '&:hover': {
      background: 'rgba(8,199,251,1)',
      color: 'rgba(86,3,114,1)',
    },
  },
}));

const renderTextField = ({
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

const renderSlider = ({
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
  const renderAutoCompleteField = ({ options, classes, input, label, ...custom }) => {
    return (
      <Autocomplete
      options={options || ''}
      getOptionLabel={(option) => option[Object.keys(option)] || ''}
      classes={{ listbox: classes.listbox, input: classes.input, option: classes.option }}
      value={options.find((option) => option[Object.keys(option)] === input.value) || ''}
      onBlur={e => input.onBlur(undefined)}
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
      
      const renderAutoCompleteDataField = ({ options, classes, input, label, ...custom }) => {
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
          
          const renderCheckbox = ({ classes, input, label }) => (
            <FormControlLabel
            className={classes.label}
            label={label}
            labelPlacement="start"
            control={<Checkbox checked={input.value ? true : false} onChange={input.onChange} name="original" />}
            />
            );
            
            const initialValues = {
              duration: [],
              year: [],
              tempo: [],
              acousticness: [1,3],
              danceability: [1,3],
              energy: [1,3],
              instrumentalness: [1,3],
              liveness: [1,3],
              speechiness: [1,3],
              valence: [1,3],
            
            }
const FilterControl = ({attributes, objectType, songs, elements, handleSubmit }) => {
              
              const dispatch = useDispatch();

            const initializeSliders = () => {
              if (!initialValues.duration.length){
                initialValues.duration = [0, Math.max(...songs.map((song) => parseInt((song.duration/ 1000)/60)+1))]
              }
              if (!initialValues.year.length){
                initialValues.year = [Math.min(...songs.map((song) => parseInt(song.year.split('-')[0]))), Math.max(...songs.map((song) => parseInt(song.year.split('-')[0])))]
              }
              if (!initialValues.tempo.length){
                initialValues.tempo = [Math.min(...songs.map((song) => parseInt(song.tempo))), Math.max(...songs.map((song) => parseInt(song.tempo)))]
              }
            }

            useEffect(() => {
              initializeSliders()
            })

            const renderAdvancedFilters = () => {
              const advancedOptions = ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "speechiness","valence"]
             return advancedOptions.map(option => {
                return (
                <Grid item>
                  <Field classes={classes} 
                      min={1}
                      max={3} 
                      marks={[{value: 1, label: "Low" }, {value: 2, label: "Medium"}, {value: 3, label: "High"}]}
                      valueLabelDisplay={'off'}
                      name= {option}
                      component={renderSlider} 
                      label={titleCase(option)}
                      />
                      </Grid>
                      )
                
              })
            }
              const titleCase = (s) => { 
                return s
                .replace(/([^A-Z])([A-Z])/g, '$1 $2') // split cameCase
                .replace(/[_\-]+/g, ' ') // split snake_case and lisp-case
                .toLowerCase()
                .replace(/(^\w|\b\w)/g, function(m) { return m.toUpperCase(); }) // title case words
                .replace(/\s+/g, ' ') // collapse repeated whitespace
                .replace(/^\s+|\s+$/, ''); // remove leading/trailing whitespace
              }
              
              
              const renderOptions = (attr) => {
                let options = songs.map((song)=> 
                
                <option value={song[attr]}>{titleCase(song[attr])}</option>
                
                )
                return options
              }
              
              const renderModality = (keys) => {
                
                let options = keys.map((key) => 
                <option value={Object.values(key)[0]}>{Object.values(key)[0]}</option>)
                return options
              }
              

              const onFormSubmit = (formValues) => {
                      onSubmit(formValues);
               };
              
              
              const onSubmit = (formValues) => {
                dispatch(
                  setFilter({
                    ...formValues,
                    key: normalize(keys, formValues.key),
                    mode: normalize(modes, formValues.mode),
                    filter: true
                  })
                );
            }    
              const classes = useStyles();
              
              return (
                <>
      <form
        className={classes.formControl}
        onSubmit={handleSubmit(onFormSubmit)}
        >
        <Grid container justify="flex-start" spacing={2} alignContent="center" alignItems="flex-end">
          <Grid item>
            <Field  classes={classes} name="title" label="Title"  component={renderTextField} />
          </Grid>
         
          <Grid item>
          <Field
              options={songs.map((song) => song.artist)}
              classes={classes}
              name="artist"
              component={renderAutoCompleteDataField}
              label="Artist"
              /> 
          </Grid>
          <Grid item>
          <Field
              options={songs.map((song) => song.album)}
              classes={classes}
              name="album"
              component={renderAutoCompleteDataField}
              label="Album"
              />
          </Grid>
          <Grid item>
          <Field
              options={songs.map((song) => song.genre)}
              classes={classes}
              name="genre"
              component={renderAutoCompleteDataField}
              label="Genre"
              />
          </Grid>
          <Grid item>
          <Field
              options={songs.map((song) => renderText(keys,song.key))}
              classes={classes}
              name="key"
              component={renderAutoCompleteDataField}
              label="Key"
              />
          </Grid>
          <Grid item>
              <Field options={modes} classes={classes} name="mode" component={renderAutoCompleteField} label="Mode" />
          </Grid>
          <Grid item>
              <Field options={_.uniq(songs.map((song) => `${song.time_signature}/4`))} classes={classes} name="time_signature" component={renderAutoCompleteDataField} label="Time Signature" />
          </Grid>
          <Grid item>
            <Field classes={classes} name="original" component={renderCheckbox} label="Original" />
          </Grid>
          <Grid item>
            <Field classes={classes} name="explicit" component={renderCheckbox} label="Explicit" />
          </Grid>
          <Grid item>
          <Field classes={classes} 
                 min={0}
                 max={Math.max(...songs.map((song) => parseInt((song.duration/ 1000)/60)+1))} 
                 name="duration" 
                 component={renderSlider} 
                 label="Duration" 
                 />
          
          
          </Grid>
          <Grid item>
          <Field classes={classes} 
                 min={Math.min(...songs.map((song) => parseInt(song.year.split('-')[0])))}
                 max={Math.max(...songs.map((song) => parseInt(song.year.split('-')[0])))} 
                 name="year" 
                 component={renderSlider} 
                 label="Year Released" 
                 />
          
          
          </Grid>
            <Grid item>
              <Field classes={classes} 
                    min={Math.min(...songs.map((song) => parseInt(song.tempo)))}
                    max={Math.max(...songs.map((song) => parseInt(song.tempo)))} 
                    name="tempo" 
                    component={renderSlider} 
                    label="Tempo" 
                    />
          
          
          </Grid>
             {renderAdvancedFilters()}
          
         
          <Grid item sm={4}>
            <Button className={classes.button} type="submit" variant="contained">
              Filter
            </Button>
            <Button className={classes.button} onClick={e => {
              dispatch(clearFilter(objectType))
              dispatch(reset('FilterForm'))
            }} variant="contained">
              clear
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};


export default reduxForm({
  form: 'FilterForm',
  initialValues: initialValues
})(FilterControl);

