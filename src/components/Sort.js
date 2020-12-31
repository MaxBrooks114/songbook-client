import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { setFilter, clearFilter } from '../actions/filter';
import { Field, reduxForm, reset, initialize } from 'redux-form';
import {  useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import keys from '../components/songs/keys'
import modes from '../components/songs/modes'
import { makeStyles } from '@material-ui/styles';
import {normalize, titleCase } from '../helpers/detailHelpers'
import {renderAutoCompleteDataField} from '../helpers/MaterialUiReduxFormFields'
import _ from 'lodash'



const useStyles = makeStyles((theme) => ({

  formControl: {
    color: theme.palette.info.main,
    verticalAlign: 'middle',
    textTransform: "capitalize",
    marginRight: '29px',

  '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.info.main,
        color: theme.palette.info.main,
      },

      '&.Mui-focused fieldset': { 
          borderColor: theme.palette.primary.light,
      },

      '&:hover fieldset': {
        borderColor: theme.palette.primary.light,
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
  
    '& .MuiFormControl-root': {
      verticalAlign: 'middle'
    },
    '& .MuiFormControlLabel-label': {
      color: theme.palette.info.main,
      fontSize: '.8rem',
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
  
  select: {
    height: 40,
  },

  listbox: {
    background: theme.palette.background.default
  },

  option: {
    color: theme.palette.info.main,
    textTransform: 'capitalize',
    fontSize: '.8rem',
    '&[data-focus="true"]': {
      background: theme.palette.common.gray,
      color: theme.palette.info.main
    },
  },

   button: {
    color: theme.palette.info.light,
    marginLeft: '2px',
    borderRadius: '5em',
    background: `linear-gradient(90deg, ${theme.palette.primary.light} 0%,  ${theme.palette.common.gray} 150%)`,
    '&:hover': {
      background: theme.palette.common.gray,
      color: theme.palette.primary.main,
    },
  },

   clearButton: {
    borderRadius: '5em',
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
           color: theme.palette.primary.light
        },
      }, 
}));


const Sort = ({items, objectType, handleSubmit, songs }) => {
    const dispatch = useDispatch();
    const filterValues = useSelector(state => state.filter)
    const omitFields = ['id', 'spotify_url', 'spotify_id', 'image', 'sections', 'instruments', 'lyrics']
    const itemProps = Object.keys(Object.values(items)[0]).filter(k => !omitFields.includes(k)) 
    const params = useParams()

    useEffect(() => {

    
      if(!filterValues.sort && !filterValues.filter){
        filterValues.sort = objectType === 'songs' ? 'artist' : 'song'
      }     
    })

    const onFormSubmit = (formValues) => {
            onSubmit(formValues);
     };
    
    
    const onSubmit = (formValues) => {
      dispatch(
        setFilter({
          ...formValues, 
          filter: true
        })
      );
    }  

    const classes = useStyles();
    
   
  return (
      <div>
        <form className={classes.formControl} style={params.id ? { marginBottom: '16px', width: '95%'}: null} onSubmit={handleSubmit(onFormSubmit)}>
          <Grid container spacing={2} className={classes.root} align="center" justify={params.id ? "center" : "flex-end"} >
            <Grid item xs={!params.id ? 2: 5}>
              <Field  classes={classes} 
                      name="sort" 
                      options={itemProps && itemProps.length ? itemProps.map(prop => prop): null}
                      getOptionLabel = {x => x}
                      renderOption={option => <span>{titleCase(option)}</span>}
                      component={renderAutoCompleteDataField} 
                      InputLabelProps={{ 
                        classes: {
                          root: classes.label,
                          shrink: "shrink"
                        }
                      }}
                      label="Sort" 
              />
            </Grid>
            <Grid item xs={!params.id ? 2: 5}>
              <Field classes={classes} 
                    name="order" 
                    options={["Ascending", "Descending"]}
                    component={renderAutoCompleteDataField} 
                    label="Order" 
                    InputLabelProps={{ 
                      classes: {
                        root: classes.label,
                        shrink: "shrink"
                      }
                    }}/>
            </Grid>
          <Grid item xs={!params.id ? 1: 3 }>
            <Button style={params.id ? {marginLeft: 0}:null} className={classes.button} type="submit" variant="contained">
              Sort
            </Button>
          </Grid>
          <Grid item xs={!params.id ? 1: 3}>
              <Button className={classes.clearButton} 
                      onClick={e => {
                          dispatch(clearFilter(objectType))
                          dispatch(reset('FilterForm'))
                        }} 
                      variant="contained">
                      clear
              </Button>
          </Grid>
          
          </Grid>   
        </form>
      </div>
    );
};

export default reduxForm({
  form: 'FilterForm',
})(Sort);