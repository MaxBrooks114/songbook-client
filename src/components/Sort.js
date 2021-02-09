import { makeStyles } from '@material-ui/styles'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { setFilter } from '../actions/filter'
import { renderTextField } from '../helpers/MaterialUiReduxFormFields'
import { getFilteredItems } from './../selectors/filterSelectors'

const useStyles = makeStyles((theme) => ({

  root: {
    color: theme.palette.info.main,
    display: 'inline',
    verticalAlign: 'middle',
    textTransform: 'capitalize',
    width: '95%',
    marginRight: 'auto',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.info.main,
        color: theme.palette.info.main
      },

      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.dark
      },

      '&:hover fieldset': {
        borderColor: theme.palette.primary.dark
      }
    },

    '& .MuiInputBase-input': {
      color: theme.palette.info.main,
      textTransform: 'capitalize'
    },

    '& .MuiTextField-root': {
      color: theme.palette.info.main,
      width: 120,
      marginRight: 15,
      [theme.breakpoints.down('md')]: {
        marginRight: 0
      }
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
        fontSize: '.8rem'
      }
    },

    '& .MuiGrid-item': {
      [theme.breakpoints.down('sm')]: {
        marginLeft: '0px !important'
      }
    },

    [theme.breakpoints.down('sm')]: {
      margin: 0
    },
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      width: '100%'
    }

  },

  listbox: {
    '& .MuiPaper-root': {
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
    }
  },

  label: {
    color: theme.palette.info.main,
    fontSize: '.8rem',
    '&.shrink': {
      color: theme.palette.primary.dark
    }
  }
}))

const Sort = ({ objectType }) => {
  const filterValues = useSelector(state => state.filter)
  const filterForm = useSelector(state => state.form.FilterForm)
  const omitFields = ['id', 'spotify_url', 'spotify_id', 'image', 'sections', 'instruments', 'lyrics']
  const items = useSelector((state) => getFilteredItems(state, objectType))
  const itemProps = Object.keys(Object.values(items)[0]).filter(k => !omitFields.includes(k))
  const dispatch = useDispatch()

  useEffect(() => {
    if (!filterValues.sort && !filterValues.filter) {
      if (objectType === 'songs') {
        dispatch(setFilter({ sort: 'artist' }))
      } else {
        dispatch(setFilter({ sort: 'song' }))
      }
    }

    if (!itemProps.includes(filterValues.sort)) {
      dispatch(setFilter({ sort: 'created_at', order: 'descending' }))
    }
  }, [filterValues.sort, filterValues.filter, objectType, itemProps, dispatch])

  const classes = useStyles()

  return (
        <form name="FilterForm" className={classes.root} >
              <Field classes={classes}
                      name="sort"
                      label="Sort"
                      component={renderTextField}
                      select
                      options={ itemProps && itemProps.length ? itemProps.map(prop => prop) : null }
                      onChange={(e, v) => {
                        // redux forms do not allow for submitting forms onChange in a neat way so this is my dirty work around
                        if (filterForm && filterForm.values) dispatch(setFilter({ sort: v, filter: true }))
                        if (filterForm && filterForm.values.sort !== filterValues.sort) dispatch(setFilter({ sort: v, filter: true }))
                      }
                      }

                      InputLabelProps={{
                        classes: {
                          root: classes.label,
                          shrink: 'shrink'
                        }
                      }}
              />

              <Field classes={classes}
                    name="order"
                    label="Order"
                    select
                    options={['ascending', 'descending']}
                    component={renderTextField}
                    onChange={(e, v) => {
                      // redux forms do not allow for submitting forms onChange in a neat way so this is my dirty work around
                      dispatch(setFilter({ order: v, filter: true }))
                      if (filterForm.values.order !== filterValues.order) dispatch(setFilter({ order: v, filter: true }))
                    }
                      }
                    InputLabelProps={{
                      classes: {
                        root: classes.label,
                        shrink: 'shrink'
                      }
                    }}/>
        </form>
  )
}

export default reduxForm({
  form: 'FilterForm'

})(Sort)
