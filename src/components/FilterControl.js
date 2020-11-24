import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter, clearFilter } from '../actions/filter';
import { Field, reduxForm, reset } from 'redux-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import keys from '../components/songs/keys'
import modes from '../components/songs/modes'
import { makeStyles } from '@material-ui/styles';
import {renderText, normalize, titleCase} from '../helpers/detailHelpers'
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
                initialValues.tempo = [Math.min(...songs.map((song) => parseInt(song.tempo))), Math.max(...songs.map((song) => parseInt(song.tempo+1)))]
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
              options={_.uniq(songs.map((song) => song.artist))}
              classes={classes}
              name="artist"
              component={renderAutoCompleteDataField}
              label="Artist"
              /> 
          </Grid>
          <Grid item>
          <Field
              options={_.uniq(songs.map((song) => song.album))}
              classes={classes}
              name="album"
              component={renderAutoCompleteDataField}
              label="Album"
              />
          </Grid>
          <Grid item>
          <Field
              options={_.uniq(songs.map((song) => song.genre))}
              classes={classes}
              name="genre"
              component={renderAutoCompleteDataField}
              label="Genre"
              />
          </Grid>
          <Grid item>
          <Field
              options={_.uniq(songs.filter(song => song.key !== null).map((song) => renderText(keys,song.key)))}
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
                 valueLabelDisplay={true}
                 component={renderSlider} 
                 label="Duration" 
                 />
          
          
          </Grid>
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
            <Grid item>
              <Field classes={classes} 
                    min={Math.min(...songs.filter(song => song.tempo !== null).map((song) => parseInt(song.tempo)))}
                    max={Math.max(...songs.filter(song => song.tempo !== null).map((song) => parseInt(song.tempo)+1))} 
                    name="tempo" 
                    valueLabelDisplay={true}
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

