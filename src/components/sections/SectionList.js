import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getFilteredItems } from '../../selectors/filterSelectors'
import Sort from '../Sort'
import SongAccordion from './SongAccordion'

const useStyles = makeStyles((theme) => ({

  list: {
    paddingTop: 0,
    minHeight: '100vh',
    height: '80%',
    overflow: 'scroll',
    borderRadius: 4

  },

  sortBar: {
    width: '95%',
    display: 'flex',
    justifyContent: 'flex-end'
  },

  title: {
    width: '95%',
    fontWeight: 600,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      width: '100%'
    }
  }

}))
const SectionList = ({ listColumnSize, setListColumnSize, transitionDuration, height }) => {
  const filteredSections = useSelector((state) => getFilteredItems(state, 'sections'))
  const songs = useSelector((state) => state.songs)
  const filter = useSelector((state) => state.filter)
  const order = filter.order === 'ascending' ? [1, -1] : [-1, 1]
  const orderedSongs = filter.sort === 'song'
    ? Object.values(songs).sort((a, b) => (a.title > b.title ? order[0] : order[1]))
    : Object.values(songs)
  const classes = useStyles()
  const history = useHistory()

  const renderSongs = () => {
    return orderedSongs.length
      ? orderedSongs.map((song) => {
        const sections = filteredSections.filter(section => song.id === section.song.id)
        return sections.length
          ? <SongAccordion key ={song.id} song={song} transitionDuration={transitionDuration} sections={sections} />
          : null
      })
      : null
  }

  return (
      <>
        <Typography variant="h5" className={classes.title}>
          Sections
        </Typography>
        <div className={classes.sortBar}>
          <Sort objectType='sections'/>
          {listColumnSize === 3
            ? <IconButton
                onClick={() => {
                  setListColumnSize(8)
                  history.push('/sections')
                }}>
                <NavigateNextIcon />
              </IconButton>
            : null}
        </div>
        <List className={classes.list} style={{ height: height }}>
          {renderSongs()}
        </List>
      </>
  )
}

export default React.memo(SectionList)
