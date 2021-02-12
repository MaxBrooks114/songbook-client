import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import genres from '../../dataToImport/genres'
import keys from '../../dataToImport/keys'
import modes from '../../dataToImport/modes'
import { FileInput, renderAutoCompleteDataField, renderAutoCompleteField, renderCheckbox, renderTextField } from '../sharedComponents/MaterialUiReduxFormFields'

const useStyles = makeStyles((theme) => ({

  root: {

    '& .MuiOutlinedInput-root': {
      background: theme.palette.background.default,
      width: 300,
      [theme.breakpoints.down('md')]: {
        width: 240
      },
      [theme.breakpoints.down('sm')]: {
        width: 200
      },
      '& fieldset': {
        borderColor: theme.palette.info.main
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.dark
      }

    },

    '& .MuiInputBase-input': {
      fontSize: '1rem'
    },

    '& .MuiInputAdornment-root .MuiTypography-colorTextSecondary': {
      color: theme.palette.info.main
    },
    ' & .MuiFormHelperText-contained': {
      color: theme.palette.common.orange
    },

    '& .MuiFormLabel-asterisk': {
      color: theme.palette.common.orange,
      fontSize: 20
    },

    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.orange
    },

    '& .MuiFormLabel-root.Mui-error': {
      color: theme.palette.common.orange
    }

  },

  autoComplete: {
    color: theme.palette.info.main
  },

  button: {
    color: theme.palette.info.main,
    display: 'inline-block',
    borderRadius: 4,
    background: theme.palette.common.gray

  },

  checkBox: {
    '&.Mui-checked': {
      color: theme.palette.info.main
    }

  },

  input: {
    textTransform: 'capitalize'
  },

  label: {
    color: theme.palette.info.main,

    '&.shrink': {
      color: theme.palette.info.main
    }
  },

  listbox: {
    background: theme.palette.background.default
  },

  lyrics: {
    '& .MuiOutlinedInput-root': {
      width: 'auto',
      minWidth: 300,
      [theme.breakpoints.down('sm')]: {
        minWidth: 200
      }
    }
  },

  option: {
    color: theme.palette.info.main,
    textTransform: 'capitalize',

    '&[data-focus="true"]': {
      background: theme.palette.primary.main,
      color: theme.palette.background.default
    }
  },

  uploadButton: {
    background: theme.palette.secondary.dark,
    '&:hover': {
      background: theme.palette.info.main,
      color: theme.palette.primary.main
    },
    margin: '1rem',
    width: 400,
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    }
  },

  uploadFieldSet: {
    borderRadius: '4px',
    borderColor: theme.palette.info.main,
    borderWidth: 'thin',
    background: theme.palette.background.default
  },

  value: {
    color: theme.palette.info.main
  }

}))

const SongForm = ({ onSubmit, handleSubmit, initialValues }) => {
  // this is for album image upload name
  const filesUploaded = useSelector(state => state.form.SongCreate.values)
  const classes = useStyles()

  const onFormSubmit = (formValues) => {
    onSubmit(formValues)
  }
  return (

    <form onSubmit={handleSubmit(onFormSubmit)} className={classes.root}>
        <Grid container align="center" alignItems="flex-end" justify="center" >
              <Grid item xs={12} md={6}>
                <Field
                  classes={classes}
                  required
                  name="title"
                  component={renderTextField}
                  label="Title"
                  InputLabelProps={{
                    classes: {
                      root: classes.label,
                      shrink: 'shrink'
                    }
                  }}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  classes={classes}
                  required
                  name="artist"
                  component={renderTextField}
                  label="Artist"
                  InputLabelProps={{
                    classes: {
                      root: classes.label,
                      shrink: 'shrink'
                    }
                  }}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  classes={classes}
                  name="album"
                  component={renderTextField}
                  label="Album"
                  InputLabelProps={{
                    classes: {
                      root: classes.label,
                      shrink: 'shrink'
                    }
                  }}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  options={genres.sort()}
                  classes={classes}
                  inputValue={initialValues ? initialValues.genre : undefined}
                  name="genre"
                  component={renderAutoCompleteDataField}
                  label="Genre"
                  InputLabelProps={{
                    classes: {
                      root: classes.label,
                      shrink: 'shrink'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  options={keys}
                  classes={classes}
                  name="key"
                  inputValue={initialValues ? initialValues.key : undefined}
                  component={renderAutoCompleteField}
                  label="Key"
                  InputLabelProps={{
                    classes: {
                      root: classes.label,
                      shrink: 'shrink'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  options={modes}
                  classes={classes}
                  name="mode"
                  inputValue={initialValues ? initialValues.mode : undefined}
                  component={renderAutoCompleteField}
                  label="Mode"
                  InputLabelProps={{
                    classes: {
                      root: classes.label,
                      shrink: 'shrink'
                    }
                  }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field classes={classes} name="tempo" inputAdornment="BPM" component={renderTextField} label="Tempo" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  classes={classes}
                  name="time_signature"
                  inputAdornment="/4"
                  component={renderTextField}
                  label="Time Signature"
                  InputLabelProps={{
                    classes: {
                      root: classes.label,
                      shrink: 'shrink'
                    }
                  }}
                />
              </Grid>
            {/* Only show this button for non imported songs */}
            {!initialValues || !initialValues.image
              ? <Grid item xs={12} >
              <fieldset className={classes.uploadFieldSet}>
                <legend>Image</legend>
                <Grid container justify='center'>
                  <Grid item xs={12} md={12}>
                    <Field
                      component={FileInput}
                      classes={classes}
                      name="uploaded_image"
                      label={filesUploaded && filesUploaded.uploaded_image ? filesUploaded.uploaded_image.name : 'Upload Album Cover'}
                      accept="image/*, application/pdf"
                      type='file'
                    />
                  </Grid>
                  </Grid>
                </fieldset>
              </Grid>
              : null}
              <Grid item xs={12} >
                <Field
                  fullWidth
                  classes={classes}
                  className={classes.lyrics}
                  name="lyrics"
                  multiline
                  rows={8}
                  component={renderTextField}
                  label="Lyrics"
                  InputLabelProps={{
                    classes: {
                      root: classes.label,
                      shrink: 'shrink'
                    }
                  }}
                />
              </Grid>
            <Grid container alignItems="flex-end" justify="space-between">
            <Grid item xs={4}>
              <Field classes={classes} name="original" component={renderCheckbox} label="Original" />
            </Grid>
            <Grid item xs={4}>
                <Button type="submit" className={classes.button} variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
            </Grid>
        </form>
  )
}

const validate = (formValues) => {
  const errors = {}
  const requiredFields = ['title', 'artist']
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

export default reduxForm({
  form: 'SongCreate',
  validate
})(SongForm)
