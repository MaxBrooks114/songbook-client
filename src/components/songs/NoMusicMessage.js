import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import trebleClef from '../../assets/trebleClef.png'

const useStyles = makeStyles((theme) => ({

  graphic: {
    display: 'block',
    margin: '50px auto',
    width: 150,
    height: 310
  },

  message: {
    display: 'block',
    margin: '0 auto',
    overflowWrap: 'normal'
  }

}))
const NoMusicMessage = () => {
  const classes = useStyles()
  const location = useLocation()
  return !location.pathname.includes('new')
    ? (
    <div style={{ marginTop: 70 }}>
      <img className={classes.graphic} src={trebleClef} alt="treble-clef"/>
      <Typography className={classes.message}>You have no songs! Import one by using the Spotify Search function the navbar or by adding one by following this <Link to="/songs/new">link</Link></Typography>
    </div>
      )
    : null
}

export default NoMusicMessage
