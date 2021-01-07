import React, { useEffect } from 'react';
import { useSelector} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {  useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import {renderTextField} from '../helpers/MaterialUiReduxFormFields'



const useStyles = makeStyles((theme) => ({

  formControl: {
    color: theme.palette.info.main,
    verticalAlign: 'middle',
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
  

    '& .MuiInputBase-input': {
      color: theme.palette.info.main,
      textTransform: "capitalize",   
    },

    '& .MuiTextField-root': {
      color: theme.palette.info.main, 
      width: '100%',

    },

    '& .MuiOutlinedInput-input': {
      color: theme.palette.info.main, 
      paddingTop: 10.5,
      paddingBottom: 10.5,
      paddingLeft: 5,
      paddingRight: 5,
      fontSize: '.8rem'
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
    }
    
  },

  listbox: {
    "& .MuiPaper-root": {
      background: theme.palette.background.default
    }
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

  label: {
    color: theme.palette.info.main,  
    fontSize: '.8rem',
    '&.shrink': {
           color: theme.palette.primary.dark
        },
      }, 
}));


const Sort = ({items, objectType, handleSubmit, submit, form }) => {
    const filterValues = useSelector(state => state.filter)
    const filterForm = useSelector(state => state.form.FilterForm)
    const omitFields = ['id', 'spotify_url', 'spotify_id', 'image', 'sections', 'instruments', 'lyrics']
    const itemProps = Object.keys(Object.values(items)[0]).filter(k => !omitFields.includes(k)) 
    const params = useParams()
    useEffect(() => {

    
      if(!filterValues.sort && !filterValues.filter){
        filterValues.sort = objectType === 'songs' ? 'artist' : 'song'
      }     
    })
    
    const classes = useStyles();
    
   
  return (
        <form name="FilterForm" className={classes.formControl} style={params.id ? { marginBottom: '16px', width: '95%'}: {margin: 'auto', width: '95%'}} >
          <Grid container  spacing={params.id ? null : 2} className={classes.root} align="center" justify={params.id ? "space-between" : "flex-end"} >
            <Grid item xs={!params.id ? 2: 5}>
              <Field  classes={classes} 
                      name="sort" 
                      label="Sort" 
                      component={renderTextField} 
                      select
                      options={ itemProps && itemProps.length ? itemProps.map(prop => prop) : null }
                      onChange={(e, v) => {   
                        // redux forms do not allow for submitting forms onChange in a neat way so this is my dirty work around    
                          if(filterForm && filterForm.values) filterForm.values.sort = v;
                          if(filterForm && filterForm.values.sort !== filterValues.sort) filterValues.sort = v
                        }
                      } 

                      InputLabelProps={{ 
                        classes: {
                          root: classes.label,
                          shrink: "shrink"
                        }
                      }}
              />
              
            </Grid>
            <Grid item xs={!params.id ? 2: 6}>
              <Field classes={classes} 
                    name="order" 
                    label="Order" 
                    select
                    options={['ascending', 'descending']}
                    component={renderTextField} 
                    onChange={(e, v) => {   
                        // redux forms do not allow for submitting forms onChange in a neat way so this is my dirty work around    
                          filterForm.values.order = v;
                          filterValues.filter = true
                          if(filterForm.values.order !== filterValues.order) filterValues.order = v
                        }
                      } 
                    InputLabelProps={{ 
                      classes: {
                        root: classes.label,
                        shrink: "shrink"
                      }
                    }}/>
            </Grid>
         
          </Grid>   
        </form>
    );
};

export default reduxForm({
  form: 'FilterForm',
 
})(Sort);