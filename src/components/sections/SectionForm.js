import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { FileInput, renderAutoCompleteDataField, renderAutoCompleteField, renderCheckbox, renderCheckboxGroup, renderTextField } from '../../helpers/MaterialUiReduxFormFields'
import keys from '../songs/keys'
import modes from '../songs/modes'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.info.main,
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
    '& .MuiInputAdornment-root .MuiTypography-colorTextSecondary': {
      color: theme.palette.info.main
    },
    ' & .MuiFormHelperText-contained': {
      color: theme.palette.common.orange
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

  fieldSet: {
    borderColor: theme.palette.info.main,
    borderWidth: 'thin',
    borderRadius: '4px',
    background: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left'
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
    borderColor: theme.palette.info.main,
    '& .MuiInputBase-root': {
      width: 'auto'
    }
  },

   option: {
    color: theme.palette.info.main,
    textTransform: 'capitalize',

    '&[data-focus="true"]': {
      background: theme.palette.primary.main,
      color: theme.palette.info.main
    }
  },

  uploadFieldSet: {
    borderRadius: '4px',
    borderColor: theme.palette.info.main,
    borderWidth: 'thin',
    background: '#f0f0f0'
  },
  

  value: {
    color: theme.palette.info.main
  },
 
}))

const SectionForm = ({ songs, onSubmit, handleSubmit, instruments }) => {
  const classes = useStyles()
  const filesUploaded = useSelector(state => state.form.SectionCreate.values)
  const onFormSubmit = (formValues) => {
    onSubmit(formValues)
  }
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={classes.root}>
      <Grid container alignItems="flex-end" align="center" justify="center" >

          <Grid item xs={12} md={6}>
            <Field classes={classes} required name="name" component={renderTextField} label="Name" InputLabelProps={{
              classes: {
                root: classes.label,
                shrink: 'shrink'
              }
            }}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              options={_.uniq(Object.values(songs).map(song => song.title))}
              classes={classes}
              name="song"
              style={{ height: '44px' }}
              component={renderAutoCompleteDataField}
              label="Song"
              required
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
              classes={classes}
              required
              name="start"
              component={renderTextField}
              label="Start"
              InputLabelProps={{
                classes: {
                  root: classes.label,
                  shrink: 'shrink'
                }
              }}

              inputAdornment="(seconds)"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              classes={classes}
              required
              name="duration"
              component={renderTextField}
              label="Duration"
              inputAdornment="(seconds)"
              InputLabelProps={{
                classes: {
                  root: classes.label,
                  shrink: 'shrink'
                }
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Field options={keys} classes={classes} name="key" component={renderAutoCompleteField} label="Key" InputLabelProps={{
              classes: {
                root: classes.label,
                shrink: 'shrink'
              }
            }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field options={modes} classes={classes} name="mode" component={renderAutoCompleteField} label="Mode" InputLabelProps={{
              classes: {
                root: classes.label,
                shrink: 'shrink'
              }
            }}/>
          </Grid>

          <Grid item xs={12} md={6}>
            <Field classes={classes} name="tempo" inputAdornment="BPM" component={renderTextField} label="Tempo" InputLabelProps={{
              classes: {
                root: classes.label,
                shrink: 'shrink'
              }
            }} />
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
           <Grid item xs={12}>
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
          <Grid item xs={12} >
            <fieldset className={classes.fieldSet}>
              <legend>Instruments</legend>
              <Field
                  name="instruments"
                  component={renderCheckboxGroup}
                  options={instruments}
              />
            </fieldset>
         </Grid>

        <Grid item xs={12} >

              <fieldset className={classes.uploadFieldSet}>
                <legend>Uploads</legend>
                <Grid container justify='center'>
                <Grid item xs={12} md={12}>
                    <Field
                      component={FileInput}
                      name="recording"
                      label={filesUploaded && filesUploaded.recording ? filesUploaded.recording.name : 'Upload Recording'}
                      classes={classes}
                      accept="audio/*"
                      type='file'
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Field
                      component={FileInput}
                      classes={classes}
                      name="tab"
                      label={filesUploaded && filesUploaded.tab ? filesUploaded.tab.name : 'Upload Sheet Music/ Tabs'}
                      accept="image/*, application/pdf"
                      type='file'
                    />
                  </Grid>
                  </Grid>
                </fieldset>

              </Grid>

            <Grid container alignItems="flex-end" justify="space-between">
              <Grid item xs={12} sm={2}>
                <Field classes={classes} name="original" component={renderCheckbox} label="Original" />
              </Grid>
              <Grid item xs={12} sm={2} >
                <Field classes={classes} name="learned" component={renderCheckbox} label="learned" />
              </Grid>
              <Grid item xs={12} sm={2}>
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
  const requiredFields = ['name', 'start', 'duration', 'song']
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

export default reduxForm({
  form: 'SectionCreate',
  validate,
  initialValues: { prescribed: true }
})(SectionForm)
