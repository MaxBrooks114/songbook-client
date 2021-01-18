import React, { useEffect } from 'react';
import { useSelector} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {  useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import {renderTextField} from '../helpers/MaterialUiReduxFormFields'



const useStyles = makeStyles((theme) => ({

  formControl: {
    color: theme.palette.info.main,
    verticalAlign: 'middle',
    textTransform: "capitalize",
    width: '95%',
    margin: 'auto',
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
    },

     [theme.breakpoints.down('sm')]: {
         margin: 0,
      },  
     [theme.breakpoints.down('xs')]: {
         margin: 0,
         width: '100%'
      },  
    
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


const Sort = ({items, objectType }) => {
    const filterValues = useSelector(state => state.filter)
    const filterForm = useSelector(state => state.form.FilterForm)
    const omitFields = ['id', 'spotify_url', 'spotify_id', 'image', 'sections', 'instruments', 'lyrics']
    const itemProps = Object.keys(Object.values(items)[0]).filter(k => !omitFields.includes(k)) 
    const location = useLocation()
    let detailMode = location.pathname.includes('songs/') || location.pathname.includes('sections/')

    useEffect(() => {

    
      if(!filterValues.sort && !filterValues.filter){
        filterValues.sort = objectType === 'songs' ? 'artist' : 'song'
      }     
    })
    
    const classes = useStyles();
    
   
  return (
        <form name="FilterForm" className={classes.formControl} style={detailMode ? {margin: 0} : null }>
          <Grid container spacing={detailMode ? null : 2} align="center" justify={detailMode ? "space-between" : "flex-end"} >
            <Grid item xs={6} lg={!detailMode ? 2: 5}>
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
            <Grid item xs={6} lg={!detailMode ? 2: 5}>
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