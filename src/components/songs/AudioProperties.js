import Grid from '@material-ui/core/Grid'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

import { audioFeaturesToText, titleCase } from '../../helpers/detailHelpers'
import DetailAccordion from '../sharedDetails/DetailAccordion'

const useStyles = makeStyles((theme) => ({

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
    <DetailAccordion title="Audio Properties" renderFunction={renderAudioProperties}/>
  )
}

export default AudioProperties
