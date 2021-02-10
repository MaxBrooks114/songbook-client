import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getFilteredItems } from '../../selectors/filterSelectors'
import Sort from '../Sort'
import SongCard from './SongCard'

const useStyles = makeStyles((theme) => ({

  expand: {
    height: 32,
    width: 32
  },

  list: {
    paddingTop: 0,
    height: '80%',
    overflow: 'scroll'

  },

  listItem: {
    '&:hover': {
      transform: 'translate(10px, 10px)',
      transition: 'transform 0.2s ease 0s',
      cursor: 'pointer',
      zIndex: 2
    }

  },

  title: {
    width: '95%',
    fontWeight: 600,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      width: '100%'
    }
  },

  sortBar: {
    width: '95%',
    display: 'flex',
    justifyContent: 'flex-end'
  }

}))
const SongList = ({ listColumnSize, setListColumnSize, transitionDuration, height }) => {
  const filteredSongs = useSelector((state) => getFilteredItems(state, 'songs'))
  const songs = useSelector((state) => state.songs)
  const history = useHistory()
  const dispatch = useDispatch()
  const classes = useStyles()

  const renderedList = () => {
    return Object.values(songs).length > 0
      ? filteredSongs.map((song) => {
        transitionDuration += 50
        return (
              <ListItem onClick={() => {
                history.push(`/songs/${song.id}`)
              }} className={classes.listItem} key={song.id} disableGutters dense>
                <SongCard song={song} transitionDuration={transitionDuration} />
              </ListItem>
        )
      })
      : null
  }

  return (
      <>
        <Typography variant="h5" className={classes.title}>
          Songs
        </Typography>
        <div className={classes.sortBar}>
         <Sort objectType='songs'/>
          {listColumnSize === 3
            ? <IconButton onClick={() => {
              setListColumnSize(8)
              history.push('/songs')
            }}>
            <NavigateNextIcon className={classes.expand} />
          </IconButton>
            : null}
        </div>
        <List className={classes.list} style={{ height: height }}>
          {renderedList()}
        </List>
      </>
  )
}

export default React.memo(SongList)
