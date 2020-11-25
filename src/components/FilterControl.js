import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { setFilter, clearFilter } from '../actions/filter';
import { Field, reduxForm, reset, initialize } from 'redux-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import keys from '../components/songs/keys'
import modes from '../components/songs/modes'
import { makeStyles } from '@material-ui/styles';
import {renderText, normalize, titleCase, millisToMinutesAndSeconds} from '../helpers/detailHelpers'
import {renderTextField, renderAutoCompleteDataField, renderAutoCompleteField, renderCheckbox, renderSlider} from '../helpers/MaterialUiReduxFormFields'
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


const FilterControl = ({items, objectType, songs, instruments, handleSubmit }) => {
    const dispatch = useDispatch();
    const filterForm = useSelector(state => state.form.FilterForm)
    const initialValues = useSelector(state => state.filter)
    const divisor = objectType === 'songs' ? 60000 : 1000
    
    
   
    
      
    useEffect(() => {
    
  
      if (!initialValues.filter && filterForm && !filterForm.values) {
        dispatch(initialize('FilterForm', initialValues))
     
      }

      if(!initialValues.filter){
        initialValues.duration = [0,  Math.max(...items.map((item) => parseInt((item.duration))+1))] 

        initialValues.tempo = [Math.min(...items.filter(item => !isNaN(parseInt(item.tempo)) || item.tempo === 0).map((item) => parseInt(item.tempo))), Math.max(...items.filter(item => item.tempo || !isNaN(parseInt(item.tempo)) || item.tempo ===0).map((item) => parseInt(item.tempo+1)))]
      }
      
        
      if (!initialValues.year.length && objectType === 'songs'){
        initialValues.year = [Math.min(...songs.map((song) => parseInt(song.year.split('-')[0]))), Math.max(...songs.map((song) => parseInt(song.year.split('-')[0])))]
      }


      
    })
    const renderAdvancedFilters = () => {
       
       const advancedOptions = objectType === 'songs' ? ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "speechiness","valence"] : []
      return advancedOptions.length ? 
        advancedOptions.map(option => {
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
          
        }) : null
    }

    const renderTextFields = () => {
      const fields = objectType === 'songs' ? ['title'] : ['name']

      return fields.length > 0 ? fields.map(field => {
        return (
           <Grid item>
              <Field  classes={classes} name={field} label={titleCase(field)}  component={renderTextField} />
           </Grid>
        )
      }) : null
    }
    
    const renderStringFields = () => {
      const fields = objectType === 'songs' ? ['artist', 'album', 'genre'] : []
      return fields.length > 0 ? fields.map(field => {
        return (
           <Grid item>
              <Field
                  options={_.uniq(songs.map((song) => song[field]))}
                  classes={classes}
                  name={field}
                  component={renderAutoCompleteDataField}
                  label={titleCase(field)}
                  /> 
              </Grid>
        )
      }) : null
    }

    
    const renderCheckBoxFields = () => {
      const fields = objectType === 'songs' ? ['original', 'explicit'] : ['learned']
      return fields.length > 0 ? fields.map(field => {
        return (
           <Grid item>
            <Field classes={classes} name={field} component={renderCheckbox} label={titleCase(field)} />
          </Grid>
        )
      }) : null
    }

    const renderYearField = () => {
      return objectType === 'songs' ? (
         <Grid item>
          <Field classes={classes} 
                 min={Math.min(...songs.filter(song => song.year !== null).map((song) => parseInt(song.year.split('-')[0])))}
                 max={Math.max(...songs.filter(song => song.year !== null).map((song) => parseInt(song.year.split('-')[0])))} 
                 valueLabelDisplay={true}
                 name="year" 
                 component={renderSlider} 
                 label="Year Released" 
                 />
          
          
          </Grid>
      ) : null
    }

    const renderSongAndInstrumentFields = () => {
      const fields = ['song', 'instrument']
      return objectType === 'elements' ? 
        fields.map((field) => {
          const fieldProp = field === 'song' ? 'title' : 'name'
          const items = field === 'song' ? songs : instruments
          return (
            <Grid item>
              <Field classes={classes} name={field} label={titleCase(field)} component={renderAutoCompleteDataField}   options={items.map(item => item[fieldProp])}/>
          </Grid>
          )
        }) : null
      
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
          {renderTextFields()}
          {renderStringFields()}
          <Grid item>
            <Field
                options={_.uniq(items.filter(item => item.key !== null).map((item) => renderText(keys, item.key)))}
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
              <Field options={_.uniq(items.map((item) => `${item.time_signature}/4`))} classes={classes} name="time_signature" component={renderAutoCompleteDataField} label="Time Signature" />
          </Grid>
          {renderCheckBoxFields()}
          <Grid item>
          <Field classes={classes} 
                 min={0}
                 max={Math.max(...items.map((item) => parseInt((item.duration))+1))} 
                 name="duration" 
                 valueLabelDisplay={true}
                 valueLabelFormat={x => millisToMinutesAndSeconds(x) }	
                 component={renderSlider} 
                 label="Duration" 
                 />
          </Grid>
            {renderYearField()}
            <Grid item>
              <Field classes={classes} 
                    min={Math.min(...items.filter(item => item.tempo !== '').map((item) => parseInt(item.tempo)))}
                    max={Math.max(...items.filter(item => item.tempo !== null).map((item) => parseInt(item.tempo)+1))} 
                    name="tempo" 
                    valueLabelDisplay={true}
                    component={renderSlider} 
                    label="Tempo" 
                    />
          </Grid>
             {renderAdvancedFilters()}
             {renderSongAndInstrumentFields()}
         
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
})(FilterControl);

