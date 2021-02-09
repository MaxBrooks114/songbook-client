import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import PauseCircleOutlineRoundedIcon from '@material-ui/icons/PauseCircleOutlineRounded'
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { playSong, pressPausePlayer } from '../../actions/spotify'
import { millisToMinutesAndSeconds } from '../../helpers/detailHelpers'

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

const SongDetailTitle = ({ song }) => {
  const player = useSelector(state => state.spotifyPlayer)
  const deviceId = useSelector((state) => state.auth.user.spotify_info.device_id)
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token)
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token)
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const handleSongPlayClick = () => {
    dispatch(playSong(accessToken, song.spotify_url, refreshToken, deviceId))
  }

  const handlePauseClick = () => {
    dispatch(pressPausePlayer(accessToken, refreshToken, deviceId, song.spotify_url))
  }

  const renderSpotifyOptionSong = () => {
    if (accessToken && accessToken !== '' && song.spotify_url) {
      if (loading.loading) {
        return <div className={classes.bigPlayButtonContainer}><div className={classes.spinnerContainer}><CircularProgress thickness={2.4} size={88} /></div></div>
      } else {
        return songButton
      }
    }
  }

  const songButton = player.playing && (player.songPlay || player.sectionPlay) && player.song === song.spotify_url
    ? <IconButton className={classes.bigPauseButtonContainer} onClick={handlePauseClick}><PauseCircleOutlineRoundedIcon className={classes.bigPlayButton} /></IconButton>
    : <IconButton className={classes.bigPlayButtonContainer} onClick={handleSongPlayClick}><PlayCircleOutlineRoundedIcon className={classes.bigPlayButton} /></IconButton>

  return (
    <Grid container justify={matches ? 'center' : 'flex-start'} alignItems="center">
      <Grid item xs={10} sm={8} md={6} lg={3} className={classes.albumContainer}>
        {renderSpotifyOptionSong()}
        <img
          alt={song.album}
          className={classes.media}
          src={song.image ? song.image : song.uploaded_image}
        />
      </Grid>
      <Grid item xs={1} ></Grid>
      <Grid item xs={12} md={12} lg={7}>
        <Typography variant={matches ? 'h6' : 'h5'} className={classes.title}>{song.title}</Typography> ({millisToMinutesAndSeconds(song.duration)})
        <Typography variant={matches ? 'subtitle1' : 'h6'}>{song.artist}</Typography>
        <Typography variant={matches ? 'subtitle1' : 'h6'} style={{ display: 'inline' }}>{song.album}</ Typography> ({song.year.split('-')[0]})
      </Grid>
    </Grid>

  )
}

export default SongDetailTitle
