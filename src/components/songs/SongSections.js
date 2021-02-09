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
import { Link, useHistory, useParams } from 'react-router-dom'

import { playSection, playSong, pressPausePlayer } from '../../actions/spotify'

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

  const renderSections = (sections) => {
    return sections
      ? sections.map((section) => {
        return (
              <Grid key={section.id} item xs={4}>
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
    <Accordion className={classes.accordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography className={classes.accordionTitle}>Sections</Typography>
      </AccordionSummary>
      <AccordionDetails>
         <Grid container align="center" alignItems="center" justify="flex-start">
          {renderSections(sections)}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default SongSections
