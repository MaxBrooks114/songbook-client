import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import { fetchInstrument } from '../../actions/instruments'
import InstrumentCard from './InstrumentCard'

const useStyles = makeStyles((theme) => ({

  list: {
    paddingTop: 0,
    minHeight: '100vh',
    height: '80%',
    overflow: 'scroll',
    borderRadius: '4px'
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
    fontWeight: '600',
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
  },

  expand: {
    height: 32,
    width: 32
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('md')]: {
      marginBottom: '.7rem'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1rem'
    }
  },

  detail: {
    height: '100%'
  }

}))

const InstrumentList = ({ instruments, setListColumnSize, setShowDetail, height }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

  let transitionDuration = 50

  const handleClick = (id) => {
    dispatch(fetchInstrument(id))
  }

  const renderedList = () => {
    return Object.values(instruments).length > 0
      ? Object.values(instruments)
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((instrument) => {
          transitionDuration += 50
          return (
              <ListItem className={classes.listItem} key={instrument.id} dense>
                <InstrumentCard
                  instrument={instrument}
                  transitionDuration={transitionDuration}
                  handleClick={handleClick}
                />
              </ListItem>
          )
        })
      : null
  }

  return (
      <>
        <Typography variant="h5" className={classes.title}>
         Instruments
        </Typography>
        <div className={classes.sortBar}>
          {location.pathname.includes('instruments/')
            ? <IconButton>
            <NavigateNextIcon className={classes.expand} onClick={(event) => {
              setListColumnSize(8)
              setShowDetail(false)
              window.history.pushState(null, null, '/instruments')
            }}/>
          </IconButton>
            : null}
        </div>
        <List className={classes.list} style={{ height: height }}>
          {renderedList()}
        </List>
      </>
  )
}

export default InstrumentList
