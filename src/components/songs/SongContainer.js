import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { useTheme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, useHistory, useLocation } from 'react-router-dom'
import * as workerTimers from 'worker-timers'

import { checkIfPlaying } from '../../actions/spotify'
import filter_arrow_right from '../../assets/filter_arrow_right.svg'
import useHeight from '../../hooks/useHeight'
import FilterControl from '../FilterControl'
import PrivateRoute from '../PrivateRoute'
import NoMusicMessage from './NoMusicMessage'
import SongCreate from './SongCreate'
import SongDetail from './SongDetail'
import SongDrawer from './SongDrawer'
import SongEdit from './SongEdit'
import SongList from './SongList'

const drawerWidth = 244
const transitionDuration = 50

const useStyles = makeStyles((theme) => ({

  addIconContainer: {
    height: 72,
    width: 72,
    marginLeft: 0,
    position: 'fixed',
    top: '12%',
    zIndex: 3,
    right: '1%',
    '&:hover': {
      background: theme.palette.background.default
    },
    [theme.breakpoints.down('sm')]: {
      top: '5%',
      position: 'sticky'
    }

  },

  cardGrid: {
    minHeight: '100vh',
    position: 'relative',
    marginTop: 50
  },

  detail: {
    height: '100%',
    minHeight: '100vh',
    marginTop: 96,
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: 500
    })
  },

  drawer: {
    width: drawerWidth,
    height: '100%',
    flexShrink: 0,
    marginTop: theme.spacing(9),
    overflowY: 'scroll',
    background: theme.palette.common.gray,
    [theme.breakpoints.down('md')]: {
      zIndex: theme.zIndex.modal + 1
    }
  },

  drawerIcon: {
    height: 54,
    width: 54
  },

  drawerIconContainer: {
    height: 72,
    width: 72,
    marginLeft: 0,
    position: 'fixed',
    top: '12%',
    zIndex: 3,
    left: '1%',
    '&:hover': {
      background: theme.palette.background.default
    },
    [theme.breakpoints.down('sm')]: {
      top: '5%',
      position: 'sticky'
    }

  },

  list: {
    minHeight: '100vh',
    marginTop: 7,
    flexGrow: 1,
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: 500
    }),
    margin: 0
  },

  listShiftAlone: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: 500
    }),

    marginLeft: 47
  },

  listShiftDetail: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: 500
    })
  },

  listShiftRight: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: 500
    }),
    marginLeft: 290
  },

  listShiftLeft: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: 500
    }),
    marginLeft: 244
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('md')]: {
      marginBottom: '.7rem'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1rem'
    }
  }

}))

const SongContainer = () => {
  const songs = useSelector((state) => state.songs)
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token)
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token)
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const theme = useTheme()
  const classes = useStyles()
  const elementDOM = useRef(null)
  const [listColumnSize, setListColumnSize] = useState(8)
  const [height] = useHeight(elementDOM)
  const [openDrawer, setOpenDrawer] = useState(false)
  const medScreen = useMediaQuery(theme.breakpoints.down('md'))
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const detailShow = location.pathname.includes('/songs/')

  // constantly check if the user's Spotify player is playing something
  useEffect(() => {
    const intervalId = accessToken ? workerTimers.setInterval(() => { dispatch(checkIfPlaying(accessToken, refreshToken)) }, 1000) : null
    if (accessToken) {
      return () => {
        workerTimers.clearInterval(intervalId)
      }
    }
  }, [accessToken, refreshToken, dispatch])

  useEffect(() => {
    setListColumnSize(8)
    if (detailShow) {
      setListColumnSize(3)
    }
  }, [detailShow])

  const renderFilter = () => {
    return Object.values(songs).length > 0 ? <FilterControl setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} objectType='songs' /> : null
  }

  const renderList = () => {
    return !smallScreen
      ? (
      <>
        <Grid
          item xs={3} md={listColumnSize}
          className={clsx(classes.list, {
            [classes.listShiftRight]: openDrawer && !medScreen && !detailShow,
            [classes.listShiftLeft]: detailShow && openDrawer && !medScreen,
            [classes.listShiftDetail]: listColumnSize !== 8 && detailShow && !openDrawer,
            [classes.listShiftAlone]: !openDrawer && (!detailShow || listColumnSize === 8)
          })
          }
        >
          <SongList
            transitionDuration={transitionDuration}
            listColumnSize={listColumnSize}
            setListColumnSize={setListColumnSize}
            height={height}
          />
        </Grid>
      </>)
      : (
      <SongDrawer renderFilter={renderFilter} transitionDuration={transitionDuration} />)
  }

  return (
    <div >
      {Object.values(songs).length
        ? <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIconContainer}>
            <img src={filter_arrow_right} alt='filter-open-button' className={classes.drawerIcon}/>
        </IconButton>
        : null
      }
      {location.pathname !== '/songs/new'
        ? <IconButton
          onClick={() => history.push('/songs/new')}
          className={classes.addIconContainer}
        >
          <AddRoundedIcon className={classes.drawerIcon}/>
        </IconButton>
        : null
      }

      <SwipeableDrawer
        classes={{ paper: classes.drawer }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        variant="persistent"
        anchor="left"
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        {renderFilter()}
      </SwipeableDrawer>
      <Grid container justify='space-evenly' className={classes.cardGrid}>
        {Object.values(songs).length
          ? renderList()
          : <NoMusicMessage /> }
      {detailShow
        ? <Grid item xs={12} md={6} ref={elementDOM} className={classes.detail}>
          <Switch>
            <PrivateRoute exact path="/songs/new">
                <SongCreate />
            </PrivateRoute>
            <PrivateRoute exact path="/songs/:id">
                <SongDetail />
            </PrivateRoute>
            <PrivateRoute exact path="/songs/edit/:id">
                <SongEdit />
            </PrivateRoute>
          </Switch>
        </Grid>
        : null }
      </Grid>
    </div>
  )
}

export default SongContainer
