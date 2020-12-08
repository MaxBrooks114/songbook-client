import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { setFilter, clearFilter } from '../actions/filter';
import { Field, reduxForm, reset, initialize } from 'redux-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import keys from '../components/songs/keys'
import modes from '../components/songs/modes'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import {renderText, normalize, titleCase, millisToMinutesAndSeconds} from '../helpers/detailHelpers'
import {renderTextField, renderAutoCompleteDataField, renderAutoCompleteField, renderCheckbox, renderSlider} from '../helpers/MaterialUiReduxFormFields'
import _ from 'lodash'


const useStyles = makeStyles((theme) => ({

  formControl: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary,
    color: '#fff',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.info.main,
        color: "white",
       
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.light,
      },

      color: "white",
      textTransform: "capitalize"
    },

    '& .MuiInputBase-input': {
      color: "white",
      textTransform: "capitalize"
    },

    '& .MuiTextField-root': {
      color: "white",
    
    },
    '& .MuiOutlinedInput-input': {
      color: "white",
    },
    '& .MuiFormLabel-root': {
      color: "white",
    },

    '& .MuiAccordionSummary-content': {
      flexGrow: 0,
    },

    '& .MuiAccordionSummary-root': {
      justifyContent: 'flex-end'
    },
     '& .MuiGrid-item': {

      [theme.breakpoints.down('xs')]: {
        marginLeft: '0px !important',
       
    
      },
    },
     

  },
   accordion: {
    background: theme.palette.primary.light,
    color: 'white',
    marginBottom: '1em'
  },
  select: {
    height: 40,
  },

    listbox: {
    background: theme.palette.primary.light,
  },

  option: {
    color: 'white',
    textTransform: 'capitalize',

    '&[data-focus="true"]': {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.dark
    },
  },

   button: {
    color: theme.palette.primary.dark,
    background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%,  ${theme.palette.info.main} 150%)`,
    
    '&:hover': {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.dark,
    },
    
 

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: '1em',
  
    },
    
  },

   deleteButton: {
    color: theme.palette.primary.dark,
    background: `linear-gradient(90deg, ${theme.palette.common.red} 0%,  ${theme.palette.info.main} 150%)`,
    '&:hover': {
      background: theme.palette.common.red,
      color: theme.palette.primary.dark,
    },

  

     [theme.breakpoints.down('xs')]: {
      marginBottom: '1em',
      width: '100%',
    },
  },

  spacing: {

  }
   
  
}));


const FilterControl = ({items, objectType, songs, instruments, handleSubmit }) => {
    const dispatch = useDispatch();
    const filterForm = useSelector(state => state.form.FilterForm)
    const filterValues = useSelector(state => state.filter)
    const omitFields = ['id', 'spotify_url', 'spotify_id', 'image', 'elements', 'instruments', 'lyrics']
    const itemProps = Object.keys(Object.values(items)[0]).filter(k => !omitFields.includes(k))
   
    
      
    useEffect(() => {
    

      if (!filterValues.filter && filterForm && !filterForm.values) {
        dispatch(initialize('FilterForm', filterValues))
     
      }

      if(!filterValues.filter){
        filterValues.duration = [0,  Math.max(...items.map((item) => parseInt((item.duration))+1))] 

        filterValues.tempo = [Math.min(...items.filter(item => !isNaN(parseInt(item.tempo)) || item.tempo === 0).map((item) => parseInt(item.tempo))), Math.max(...items.filter(item => item.tempo || !isNaN(parseInt(item.tempo)) || item.tempo ===0).map((item) => parseInt(item.tempo+1)))]
      }
      
        
      if (!filterValues.year.length && objectType === 'songs'){
        filterValues.year = [Math.min(...songs.map((song) => parseInt(song.year.split('-')[0]))), Math.max(...songs.map((song) => parseInt(song.year.split('-')[0])))]
      }

      if(!filterValues.sort && !filterValues.filter){
        filterValues.sort = objectType === 'songs' ? 'artist' : 'song'
      }

      
    })
    const renderAdvancedFilters = () => {
       
       const advancedOptions = objectType === 'songs' ? ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "speechiness","valence"] : []
      return advancedOptions.length ? 
        advancedOptions.map(option => {
          return (
            <AccordionDetails>
               <Grid item xs={4}>
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
            </AccordionDetails>
        )
          
        }) : null
    }

    const renderTextFields = () => {
      const fields = objectType === 'songs' ? ['title'] : ['name']

      return fields.length > 0 ? fields.map(field => {
        return (
           <Grid item lg={3} md={6} xs={12} >
              <Field  classes={classes} name={field} label={titleCase(field)}  component={renderTextField} />
           </Grid>
        )
      }) : null
    }
    
    const renderStringFields = () => {
      const fields = objectType === 'songs' ? ['artist', 'album', 'genre'] : []
      return fields.length > 0 ? fields.map(field => {
        return (
           <Grid item  lg={3} md={6} xs={12}>
              <Field
                  options={_.uniq(songs.map((song) => song[field]))}
                  classes={classes}
                  name={field}
                  fullWidth= {false}
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
           
            <Field classes={classes} name={field} component={renderCheckbox} label={titleCase(field)} />
         
        )
      }) : null
    }

    const renderYearField = () => {
      return objectType === 'songs' ? (
         <Grid item lg={4} md={6} xs={12}>
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
            <Grid item >
              <Field 
                classes={classes} 
                name={field} 
                label={titleCase(field)} 
                component={renderAutoCompleteDataField}   
                options={items.map(item => item[fieldProp])}/>
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
     <div className={classes.root}>
       <form
            className={classes.formControl}
            onSubmit={handleSubmit(onFormSubmit)}
            >
    <Grid container align="center" className={classes.root} justify="space-around" alignItems="center" >
       <Grid item xs={12}>
      <Accordion className={classes.accordion}>
       
            <AccordionSummary  classes={classes}  expandIcon={<ExpandMoreIcon  />} aria-controls="panel1a-content" id="panel1a-header">
                          <Typography >Refine</Typography>
            </AccordionSummary>
         
          <Grid container align="center"  justify="space-around" alignItems="center" >
              {renderTextFields()}
              {renderStringFields()}
            <Grid item lg={3} md={6} xs={12}>
              {objectType === 'songs' ? renderCheckBoxFields() :  <Field
                options={_.uniq(items.filter(item => item.key !== null).map((item) => renderText(keys, item.key)))}
                classes={classes}
                name="key"
                fullWidth= {false}
                component={renderAutoCompleteDataField}
                label="Key"
                />}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Field  
                  fullWidth= {false}
                  options={modes} 
                  classes={classes} 
                  name="mode" 
                  component={renderAutoCompleteField} 
                  label="Mode" />
            </Grid>
            <Grid item lg={3} xs={12}> 
              <Field  
                  fullWidth= {false}
                  options={_.uniq(items.map((item) => `${item.time_signature}/4`))} 
                  classes={classes} 
                  name="time_signature" 
                  component={renderAutoCompleteDataField} 
                  label="Time Signature" />
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              {objectType !== 'songs' ? renderCheckBoxFields() :  <Field
                options={_.uniq(items.filter(item => item.key !== null).map((item) => renderText(keys, item.key)))}
                classes={classes}
                name="key"
                fullWidth= {false}
                component={renderAutoCompleteDataField}
                label="Key"
                />}
          </Grid>
          <Grid container  justify="center" align="center" alignItems="center">
          <Grid item lg={4} md={6} xs={10}>
              <Field 
                classes={classes} 
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
            <Grid item lg={4} xs={10} >
              <Field classes={classes} 
                    min={Math.min(...items.filter(item => item.tempo !== '').map((item) => parseInt(item.tempo)))}
                    max={Math.max(...items.filter(item => item.tempo !== null).map((item) => parseInt(item.tempo)+1))} 
                    name="tempo" 
                    valueLabelDisplay={true}
                    component={renderSlider} 
                    label="Tempo" 
                    />
            </Grid>
          </Grid>
            {renderSongAndInstrumentFields()}
         
        { objectType === 'songs' ? 
          <Grid item xs={12}>
             <Accordion className={classes.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography  className={classes.accordionHeader}>Advanced</Typography>
                </AccordionSummary>
                <Grid container justify="space-evenly">
                      {renderAdvancedFilters()}
                </Grid>
             </Accordion>
          </Grid> : null}
          </Grid>
        </Accordion>
         </Grid>
          <Grid item lg ={12}>
          <Grid container alignItems="center"  justify="center"  >
            <Grid item lg={2} sm={3} xs={12}>
                  <Field classes={classes} 
                      name="sort" 
                      options={itemProps.map(prop => prop)}
                      getOptionLabel = {x => x}
                      renderOption={option => <span>{titleCase(option)}</span>}
                      component={renderAutoCompleteDataField} 
                      label="Sort" 
                      />
            </Grid>
            <Grid item style={{marginLeft: '1.5rem'}} lg={2} sm={3} xs={12}>
                  <Field classes={classes} 
                        name="order" 
                        options={["Ascending", "Descending"]}
                        component={renderAutoCompleteDataField} 
                        label="Order" 
                        />
            </Grid>
            <Grid style={{marginLeft: '.8rem'}} item lg={1} sm={2} xs={12}>
                  <Button className={classes.button} type="submit" variant="contained">
                    {filterForm && !_.isEqual(_.omit(filterForm.initial, ['sort', 'order']),  _.omit(filterForm.values, ['sort', 'order'])) ? "Filter" : "Sort"}
                  </Button>
            </Grid>
            <Grid item lg={1} sm={1} xs={12}>
                  <Button className={classes.deleteButton} onClick={e => {
                    dispatch(clearFilter(objectType))
                    dispatch(reset('FilterForm'))
                  }} variant="contained">
                    clear
                  </Button>
                </Grid>
            </Grid> 
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'FilterForm',
})(FilterControl);

