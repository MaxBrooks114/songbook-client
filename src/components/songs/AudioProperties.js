import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Grid from '@material-ui/core/Grid'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { audioFeaturesToText, titleCase } from '../../helpers/detailHelpers'

const useStyles = makeStyles((theme) => ({

  accordion: {
    background: theme.palette.primary.light,
    color: theme.palette.info.main,
    borderRadius: 4,
    margin: '1rem 0',
    '& .MuiAccordionSummary-content': {
      flexGrow: 0
    },

    '& .MuiAccordionSummary-root': {
      justifyContent: 'space-between'
    },

    '& .MuiAccordionDetails-root': {
      padding: 0,
      marginBottom: theme.spacing(2)
    },

    '& .MuiGrid-grid-xs-10': {
      margin: 0,
      justifyContent: 'center'
    }
  },

  accordionTitle: {
    fontWeight: '500'
  },

  grayedOutMusicNote: {
    opacity: '.3'
  }

}))

const AudioProperties = ({ song }) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const songFeatureIcons = {
    low: <><MusicNoteRoundedIcon/><MusicNoteRoundedIcon className={classes.grayedOutMusicNote}/><MusicNoteRoundedIcon className={classes.grayedOutMusicNote}/></>,
    medium: <><MusicNoteRoundedIcon/><MusicNoteRoundedIcon/><MusicNoteRoundedIcon className={classes.grayedOutMusicNote}/></>,
    high: <><MusicNoteRoundedIcon/><MusicNoteRoundedIcon/><MusicNoteRoundedIcon/></>
  }

  const renderAudioProperties = () => {
    const audioFeatures = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'valence']
    return audioFeatures.map((feature, index) => {
      return index % 2 === 0
        ? (
        <>
          {matches ? null : <Grid item xs={2}/>}
          <Grid item xs={10} md={5} key={feature}>
            <Typography variant={matches ? 'caption' : 'subtitle1' }> {titleCase(feature)}: {songFeatureIcons[audioFeaturesToText(song[feature])]}</Typography>
           </Grid>
        </>
          )
        : (
        <Grid item xs={10} md={5} key={feature}>
          <Typography variant={matches ? 'caption' : 'subtitle1' }> {titleCase(feature)}: {songFeatureIcons[audioFeaturesToText(song[feature])]}</Typography>
        </Grid>
          )
    })
  }
  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography className={classes.accordionTitle}>Audio Properties</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container justify="center" alignItems="center">
          {renderAudioProperties()}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default AudioProperties
