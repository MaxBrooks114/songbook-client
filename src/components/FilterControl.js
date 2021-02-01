import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { setFilter, clearFilter } from '../actions/filter';
import { Field, reduxForm, reset, initialize, clearFields } from 'redux-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import keys from '../components/songs/keys'
import modes from '../components/songs/modes'
import IconButton from '@material-ui/core/IconButton';
import filter_arrow_left from '../assets/filter_arrow_left.svg';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import {renderText, normalize, titleCase, millisToMinutesAndSeconds} from '../helpers/detailHelpers'
import {renderTextField, renderAutoCompleteDataField, renderAutoCompleteField, renderRadioGroup, renderSlider} from '../helpers/MaterialUiReduxFormFields'
import _ from 'lodash'
import { useLocation, useHistory} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: 180,
    color: theme.palette.info.main,
      textTransform: "capitalize",

  '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.info.main,
        color: theme.palette.info.main,
      },

      '&.Mui-focused fieldset': { 
          borderColor: theme.palette.primary.dark,
      },

      '&:hover fieldset': {
        borderColor: theme.palette.primary.dark,
      },
         
    },

    '& input': {
        fontSize: '.8rem',
        [theme.breakpoints.down('sm')]: {
          textAlign: "center",        
      },    
    },

    '& .MuiInputBase-input': {
      color: theme.palette.info.main,
      textTransform: "capitalize",   
    },

    '& .MuiTextField-root': {
      color: theme.palette.info.main,    
    },
    '& .MuiOutlinedInput-input': {
      color: theme.palette.info.main,
    },
  
    '& .MuiFormControlLabel-label': {
      color: theme.palette.info.main,
      fontSize: '.8rem',
      [theme.breakpoints.down('sm')]: {
          fontSize: '.8rem',
      },      
    },

    '& .MuiAccordionSummary-content': {
      flexGrow: 0,
    },

    '& .MuiAccordionSummary-root': {
      justifyContent: 'flex-start',
      [theme.breakpoints.down('sm')]: {
          fontSize: '.8rem',
      },
    },
     '& .MuiGrid-item': {

      [theme.breakpoints.down('sm')]: {
        marginLeft: '0px !important',
      },
     
    },

    '& .MuiTypography-body1':{
      [theme.breakpoints.down('sm')]: {
          fontSize: '.8rem',
      },
    }

  },
   accordion: {
    background: theme.palette.common.gray,
    color: theme.palette.info.main,
    marginBottom: '1em'
  },
  select: {
    height: 40,
  },

    listbox: {
        background: theme.palette.common.gray
    
  },

  option: {
    color: theme.palette.info.main,
    textTransform: 'capitalize',
    fontSize: '.8rem',
    '&[data-focus="true"]': {
      background: theme.palette.background.default,
      color: theme.palette.info.main
    },
  },

   button: {
    color: theme.palette.info.light,
    display: 'inline-block',
    borderRadius: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%,  ${theme.palette.common.gray} 150%)`,
    '&:hover': {
      background: theme.palette.common.gray,
      color: theme.palette.secondary.dark,
    },
    
    
  },

   clearButton: {
    borderRadius: 4,
    display: 'inline-block',
    marginLeft: 26,
    color: theme.palette.common.gray,
    background: theme.palette.info.light,
    '&:hover': {
      color: theme.palette.info.light,
      background: theme.palette.common.gray,
    },

  },

  label: {
    color: theme.palette.info.main,  
    fontSize: '.8rem',
    '&.shrink': {
           color: theme.palette.primary.dark
        },
      },

   drawerIcon: {
    height: '54px',
    width: '54px',
  },

  drawerIconContainer: {
    '&:hover': {
      background: theme.palette.common.gray
    }
  }

  
}));


const FilterControl = ({items, objectType, songs, instruments, handleSubmit, setOpenDrawer, openDrawer }) => {
    const dispatch = useDispatch();
    const filterForm = useSelector(state => state.form.FilterForm)
    const filterValues = useSelector(state => state.filter)
    const location = useLocation()
    let songOrSections = location.pathname.split('/')[1]
  
    const booleans = {
      'true': true,
      'false': false
    }
      
    useEffect(() => {
      if(filterForm && filterForm.values && !filterForm.values.title && !filterForm.values.name && !filterForm.values.album && !filterForm.values.artist && !filterForm.values.key && !filterForm.values.genre) {
           dispatch(setFilter({filter: false}))
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[songOrSections])

    useEffect(() => {   
      
     

      if(filterValues){
        if(!filterValues.duration.length){ 
          dispatch(setFilter({ duration: [0,  Math.max(...items.filter(item => !isNaN(parseInt(item.tempo))).map((item)=>parseInt((item.duration))+1))]}))
        }
        if(!filterValues.tempo.length){ dispatch(setFilter({
          tempo: [0, Math.max(...items.filter(item => !isNaN(parseInt(item.tempo))).map((item)=>parseInt((item.tempo))+1))]}))
        }
        if(!filterValues.year.length){ dispatch(setFilter({
          year: [0,  Math.max(...items.filter(item => !isNaN(parseInt(item.year))).map((item)=>parseInt((item.year))+1))]}))
        } 
        
         if (filterForm && !filterForm.values) {
          dispatch(initialize('FilterForm', {...filterValues,
            artist: '',
            genre: '',
            album: '',
            key: '',
          }))  
        }
        
      }
    
  }, [objectType, dispatch, songs, items, filterForm, filterValues ])

    const renderAdvancedFilters = () => {      
       const advancedOptions = objectType === 'songs' ? ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "speechiness","valence"] : []
      return advancedOptions.length ? 
        advancedOptions.map(option => {
          return (
            <AccordionDetails>
               <Grid item sm={12} xs={12}>
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
           <Grid item sm={12} xs={12} >
              <Field  classes={classes} style={{width: '80%'}} name={field} label={titleCase(field)}
                   InputLabelProps={{ 
                classes: {
                  root: classes.label,
                  shrink: "shrink"
                 }
               }}  component={renderTextField} />
           </Grid>
        )
      }) : null
    }
    
    const renderStringFields = () => {
      const fields = objectType === 'songs' ? ['artist', 'album', 'genre'] : []
      return fields.length > 0 ? fields.map(field => {
        return (
           <Grid item  sm={12} xs={12}>
              <Field
                  options={_.uniq(songs.map((song) => song[field])).sort()}
                  classes={classes}
                  name={field}
                  fullWidth= {false}
                  component={renderAutoCompleteDataField}
                  label={titleCase(field)}
                   InputLabelProps={{ 
                    classes: {
                      root: classes.label,
                      shrink: "shrink"
                 }
               }}
                  /> 
              </Grid>
        )
      }) : null
    }

    
    const renderRadioFields = () => {
      const fields = objectType === 'songs' ? ['original', 'explicit'] : ['learned']
      return fields.length > 0 ? fields.map((field) => {
        return (
          <>
          <Grid item xs={1}></Grid>
          <Grid item xs={8}>
            <Field classes={classes} name={field} title={field} component={renderRadioGroup} InputLabelProps={{ 
                  classes: {
                    formControlLabel: classes.label,
                    label: classes.label
                  }
                }} />  
          </Grid>  
          <Grid item xs={3}/> 
        </>   
        )
      }) : null
    }

    const renderYearField = () => {
      return objectType === 'songs' ? (
         <Grid item  sm={12} xs={12}>
          <Field classes={classes} 
                 min={Math.min(...items.filter(item => !isNaN(parseInt(item.year))).map((item) => parseInt(item.year.split('-')[0])))}
                 max={Math.max(...items.filter(item => !isNaN(parseInt(item.year))).map((item) => parseInt(item.year.split('-')[0])))} 

                 valueLabelDisplay={true}
                 name="year" 
                 component={renderSlider} 
                 label="Year Released" 
                 InputLabelProps={{ 
                classes: {
                  root: classes.label,
                  shrink: "shrink"
                 }
               }}
                 />
          
          
          </Grid>
      ) : null
    }

    const renderSongAndInstrumentFields = () => {
      const fields = ['song', 'instrument']
      return objectType === 'sections' ? 
        fields.map((field) => {
          const fieldProp = field === 'song' ? 'title' : 'name'
          const items = field === 'song' ? songs.filter( song => !!song.sections.length).sort((a, b) => a.title > b.title ? 1 : -1) : instruments
          return (
            <Grid item >
              <Field 
                classes={classes} 
                name={field} 
                label={titleCase(field)} 
                InputLabelProps={{ 
                classes: {
                  root: classes.label,
                  shrink: "shrink"
                 }
               }}
                component={renderAutoCompleteDataField}   
                options={items.sort().map(item => item[fieldProp])}/>
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
          original: formValues.original !== '' ? booleans[formValues.original] : formValues.original,
          explicit: formValues.explicit !== '' ? booleans[formValues.explicit] : formValues.explicit,
          learned: formValues.learned !== '' ? booleans[formValues.learned]: formValues.learned,
          filter: true
        })
      );
    }    
    const classes = useStyles();
    
   
    return (
     <div >
     
      <IconButton className={classes.drawerIconContainer}>
          <img src={filter_arrow_left} alt='close filter drawer' onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIcon} />
      </IconButton>
       <form
            className={classes.formControl}
            onSubmit={handleSubmit(onFormSubmit)}
            >
      <Grid container direction="column" align="center" spacing={2} className={classes.root} alignItems="space-around" justify="center" >
        <Grid item xs={12}>
          <Button className={classes.button} type="submit" variant="contained">
            Filter
          </Button>
           <Button className={classes.clearButton} onClick={e => {
                    dispatch(reset('FilterForm'))
                    dispatch(clearFields('FilterForm'))
                    dispatch(clearFilter())
                  }} variant="contained">
                    clear
            </Button>
        </Grid>
              {renderTextFields()}
              {renderStringFields()}
            <Grid item sm={12} xs={12}>
              <Field
                options={_.uniq(items.filter(item => item.key !== null).map((item) => renderText(keys, item.key))).sort()}
                classes={classes}
                name="key"
                fullWidth= {false}
                component={renderAutoCompleteDataField}
                label="Key"
                InputLabelProps={{ 
                classes: {
                  root: classes.label,
                  shrink: "shrink"
                 }
               }}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Field  
                  fullWidth= {false}
                  options={modes} 
                  classes={classes} 
                  name="mode" 
                  component={renderAutoCompleteField} 
                  label="Mode"
                  InputLabelProps={{ 
                  classes: {
                  root: classes.label,
                  shrink: "shrink"
                 }
               }} />
            </Grid>
            <Grid item  sm={12} xs={12}> 
              <Field  
                  fullWidth= {false}
                  options={_.uniq(items.map((item) => `${item.time_signature}/4`))} 
                  classes={classes} 
                  name="time_signature" 
                  component={renderAutoCompleteDataField} 
                  label="Time Signature" />
            </Grid>
           
            <Grid item xs={12} style={{margin: 'auto'}}>
              <Grid container direction="row" justify={objectType === 'songs' ? "flex-start" : 'center'}>
                { renderRadioFields() }
              </Grid>
          </Grid>
          <Grid container  justify="center" align="center" alignItems="center">
          <Grid item sm={12} xs={10}>
              <Field 
                classes={classes} 
                min={0}
                max={Math.max(...items.filter(item => !isNaN(parseInt(item.tempo))).map((item) => parseInt((item.duration))+1))} 
                name="duration" 
                valueLabelDisplay={true}
                valueLabelFormat={x => millisToMinutesAndSeconds(x) }	
                component={renderSlider} 
                label="Duration" 

                />
              </Grid>
              {renderYearField()}
            <Grid item sm={10} xs={10} >
              <Field classes={classes} 
                    min={Math.min(...items.filter(item => !isNaN(parseInt(item.tempo)) || item.tempo === 0).map((item) => parseInt(item.tempo)))}
                    max={Math.max(...items.filter(item => !isNaN(parseInt(item.tempo)) || item.tempo === 0).map((item) => parseInt(item.tempo)))} 
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
      </form>
    </div>
  );
};

export default React.memo(reduxForm({
  form: 'FilterForm',
})(FilterControl));

