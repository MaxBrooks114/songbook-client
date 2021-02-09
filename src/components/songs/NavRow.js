import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded'
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getFilteredItems } from '../../selectors/filterSelectors'

const useStyles = makeStyles((theme) => ({

  navRow: {
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    borderRadius: 4
  },

  navButton: {
    padding: 0,
    height: 24,
    width: 24

  }

}))

const NavRow = ({song }) => {
  const filteredSongs = useSelector((state) => getFilteredItems(state, 'songs'))
  const nextSong = filteredSongs[filteredSongs.indexOf(song) + 1]
  const prevSong = filteredSongs[filteredSongs.indexOf(song) - 1]

  const history = useHistory()
  
  const classes = useStyles()
  return (
    <Grid container justify="space-between" className={classes.navRow}>
              <Grid item xs={2}>
                 {prevSong
                   ? <IconButton
                    onClick={(event) => history.push(`/songs/${prevSong.id}`)}
                > <SkipPreviousRoundedIcon className={classes.navButton} />
                </IconButton>
                   : null }
              </Grid>
                <Grid item xs={2} style={{ marginRight: 18 }}>
                  {nextSong
                    ? <IconButton
                        onClick={(event) => history.push(`/songs/${nextSong.id}`)}
                    > <SkipNextRoundedIcon className={classes.navButton}/>
                    </IconButton>
                    : null}
                </Grid>
            </Grid>
  )
}

export default NavRow
