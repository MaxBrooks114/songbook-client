import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import PauseCircleOutlineRoundedIcon from '@material-ui/icons/PauseCircleOutlineRounded'
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as workerTimers from 'worker-timers'

import { checkIfPlaying, playSection, playSong, pressPausePlayer } from '../../actions/spotify'
import { millisToMinutesAndSeconds } from '../../helpers/detailHelpers'
import BackDrop from '../ui/BackDrop'

const useStyles = makeStyles((theme) => ({

  albumContainer: {
    position: 'relative'
  },

  bigPauseButtonContainer: {
    position: 'absolute',
    top: '0',
    bottom: '4px',
    left: '0',
    right: '0',
    opacity: '.6',
    borderRadius: '4px',
    transition: '.3s ease',
    '&:hover': {
      background: theme.palette.info.main

    }

  },

  bigPlayButton: {
    color: theme.palette.background.default,
    height: '100%',
    width: '100%'

  },

  bigPlayButtonContainer: {
    position: 'absolute',
    top: '0',
    bottom: '4px',
    left: '0',
    right: '0',
    opacity: '.7',
    borderRadius: '4px',

    transition: '.3s ease',
    '&:hover': {
      background: theme.palette.info.main,
      opacity: '.6'
    }
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

  lyrics: {
    textTransform: 'none'
  },

  media: {
    objectFit: 'fill',
    borderRadius: '4px',
    height: '100%',
    width: '100%'

  },

  menu: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.info.main

  },

  menuItem: {
    ...theme.typography.tab,
    '& .MuiMenuItem-root': {
      justifyContent: 'center'
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
  },

  title: {
    fontWeight: 600,
    display: 'inline'
  }

}))

const DetailTitle = ({ song, section }) => {
  const player = useSelector(state => state.spotifyPlayer)
  const deviceId = useSelector((state) => state.auth.user.spotify_info.device_id)
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token)
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token)
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const [showBackdrop, setShowBackdrop] = useState(false)

  const spotifyUri = song ? song.spotify_url : section.song.spotify_url

  const title = song ? <>{song.title}<span style={{ fontSize: '1rem' }}> ({millisToMinutesAndSeconds(song.duration)})</span></> : section.name

  const subtitle1 = song ? song.artist : <>({millisToMinutesAndSeconds(section.start)}-{millisToMinutesAndSeconds(section.start + section.duration)}) ({millisToMinutesAndSeconds(section.duration)})</>

  const subtitle2 = song ? <>{song.album}<span style={{ fontSize: '1rem' }}> ({song.year.split('-')[0]})</span></> : <Link className={classes.link} to={`/songs/${section.song.id}`}>{section.song.title}</Link>

  const image = song ? song.image : section.song.image
  const uploadedImage = song ? song.image : section.song.image
  const album = song ? song.album : section.song.album

  // constantly check if the user's Spotify player is playing
  useEffect(() => {
    const intervalId = accessToken ? workerTimers.setInterval(() => { dispatch(checkIfPlaying(accessToken, refreshToken)) }, 1000) : null
    if (accessToken) {
      return () => {
        workerTimers.clearInterval(intervalId)
      }
    }
  }, [accessToken, refreshToken, dispatch])

  const sectionPlay = () => {
    setShowBackdrop(true)
    const timeout = workerTimers.setTimeout(() => {
      dispatch(playSection(accessToken, spotifyUri, refreshToken, section.start, section.duration, deviceId, section.id))
      setShowBackdrop(false)
      workerTimers.clearTimeout(timeout)
    }, 3000)
  }
  const handlePlayClick = () => {
    song ? dispatch(playSong(accessToken, spotifyUri, refreshToken, deviceId)) : sectionPlay()
  }

  const handlePauseClick = () => {
    dispatch(pressPausePlayer(accessToken, refreshToken, deviceId, spotifyUri))
  }

  const renderSpotifyOption = () => {
    if (accessToken && accessToken !== '' && spotifyUri) {
      if (loading.loading) {
        return <div className={classes.bigPlayButtonContainer}><div className={classes.spinnerContainer}><CircularProgress thickness={2.4} size={88} /></div></div>
      } else {
        return playButton
      }
    }
  }

  const playButton = player.playing && (player.songPlay || player.sectionPlay) && (player.song === spotifyUri || player.sectionId === section.id)
    ? <IconButton className={classes.bigPauseButtonContainer} onClick={handlePauseClick}><PauseCircleOutlineRoundedIcon className={classes.bigPlayButton} /></IconButton>
    : <IconButton className={classes.bigPlayButtonContainer} onClick={handlePlayClick}><PlayCircleOutlineRoundedIcon className={classes.bigPlayButton} /></IconButton>

  return (
    <Grid container justify={matches ? 'center' : 'flex-start'} alignItems="center">
      <Grid item xs={10} sm={8} md={6} lg={3} className={classes.albumContainer}>
        {renderSpotifyOption()}
        <img
          alt={album}
          className={classes.media}
          src={image || uploadedImage}
        />
      </Grid>
      <Grid item xs={1} ></Grid>
      <Grid item xs={12} md={12} lg={7}>
        <Typography variant={matches ? 'h6' : 'h5'} className={classes.title}>{title}</Typography>
        <Typography variant={matches ? 'subtitle1' : 'h6'}>{subtitle1}</Typography>
        <Typography variant={matches ? 'subtitle1' : 'h6'} style={{ display: 'inline' }}>{subtitle2}</ Typography>
      </Grid>
      <BackDrop showBackdrop={showBackdrop}/>
    </Grid>

  )
}

export default DetailTitle
