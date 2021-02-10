import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded'
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getFilteredItems } from '../../selectors/filterSelectors'
import SectionContainer from '../sections/SectionContainer'

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

const NavRow = ({ song, section }) => {
  const filteredSongs = useSelector((state) => getFilteredItems(state, 'songs'))
  const filteredSections = useSelector((state) => getFilteredItems(state, 'sections'))

  const next = song ? filteredSongs[filteredSongs.indexOf(song) + 1] : filteredSections[filteredSections.indexOf(section) + 1]
  const prev = song ? filteredSongs[filteredSongs.indexOf(song) - 1] : filteredSections[filteredSections.indexOf(section) - 1]
  const objectType = song ? 'songs' : 'sections'

  const history = useHistory()

  const classes = useStyles()
  return (
    <Grid container justify="space-between" className={classes.navRow}>
              <Grid item xs={2}>
                 {prev
                   ? <IconButton
                    onClick={(event) => history.push(`/${objectType}/${prev.id}`)}
                > <SkipPreviousRoundedIcon className={classes.navButton} />
                </IconButton>
                   : null }
              </Grid>
                <Grid item xs={2} style={{ marginRight: 18 }}>
                  {next
                    ? <IconButton
                        onClick={(event) => history.push(`/${objectType}/${next.id}`)}
                    > <SkipNextRoundedIcon className={classes.navButton}/>
                    </IconButton>
                    : null}
                </Grid>
            </Grid>
  )
}

export default NavRow
