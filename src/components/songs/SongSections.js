import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { playSection } from '../../actions/spotify'
import DetailAccordion from '../sharedDetails/DetailAccordion'

const useStyles = makeStyles((theme) => ({


  buttonContainer: {
    marginTop: theme.spacing(2),
    margin: theme.spacing(1)
  },

  link: {
    textDecoration: 'none',
    color: theme.palette.info.main,
    '&:hover': {
      color: theme.palette.common.darkGreen
    }
  },

  playButton: {
    color: theme.palette.background.default
  },

  spinnerContainer: {
    marginTop: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

}))

const SongSections = ({ song }) => {
  const sections = useSelector((state) =>
    Object.values(state.sections).filter((section) => song.sections.includes(section.id))
  )
  const player = useSelector(state => state.spotifyPlayer)
  const loading = useSelector((state) => state.loading)
  const deviceId = useSelector((state) => state.auth.user.spotify_info.device_id)
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token)
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token)
  const dispatch = useDispatch()
  const classes = useStyles()

  const handleSectionPlayClick = (section) => {
    dispatch(playSection(accessToken, song.spotify_url, refreshToken, section.start, section.duration, deviceId, section.id))
  }

  const renderSpotifyOptionSection = (section) => {
    if (accessToken && accessToken !== '') {
      if (loading.loading && section.id === player.sectionId) {
        return <IconButton><CircularProgress thickness={2.4} size={20} style={{ color: 'white' }} /></IconButton>
      } else {
        return <IconButton onClick={() => handleSectionPlayClick(section)}><PlayCircleOutlineRoundedIcon className={classes.playButton} /></IconButton>
      }
    }
  }

  const renderSections = () => {
    return sections
      ? sections.map((section, index) => {
        return index % 3 === 0 ? (
            <>
              <Grid item xs={2}/>
              <Grid key={section.id} item xs={3}>
                <Typography>
                  <Link className={classes.link} to={`/sections/${section.id}`}>{section.name}</Link>
                    {renderSpotifyOptionSection(section)}
                  </Typography>
              </Grid>
            </>
        ) : (
          <Grid key={section.id} item xs={3}>
            <Typography>
              <Link className={classes.link} to={`/sections/${section.id}`}>{section.name}</Link>
              {renderSpotifyOptionSection(section)}
            </Typography>
          </Grid>
        )
      })
      : null
  }
  return (
   <DetailAccordion title="Sections" renderFunction={renderSections}/>
  )
}

export default SongSections
