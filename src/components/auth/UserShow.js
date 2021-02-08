import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import { useTheme } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Switch, useHistory, useLocation } from 'react-router-dom'

import PrivateRoute from '../PrivateRoute'
import UserEdit from './UserEdit'
import UserMetrics from './UserMetrics'

const drawerWidth = 180

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.info.main,
    minHeight: '100vh',
    display: 'flex'

  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '4 rem',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em'
    }
  },

  title: {
    width: '100%',
    fontSize: '3rem',
    fontWeight: 600,
    marginLeft: '1.7rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      marginLeft: '1.3rem'
    }
  },

  albumRow: {
    width: 198,
    height: 198,
    borderRadius: 4
  },

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },

  drawerPaper: {
    background: theme.palette.common.gray,
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    marginRight: 12,
    zIndex: theme.zIndex.modal + 1
  },

  fixedHeight: {
    height: 240
  },

  songCard: {
    background: theme.palette.primary.main,
    borderRadius: 4
  },

  tabContainer: {
    marginLeft: '1rem'
  },

  tab: {
    ...theme.typography.tab,
    marginLeft: '2rem',
    color: theme.palette.info.main,
    minWidth: 10,
    opacity: 1,
    alignText: 'left'
  }
}))

const UserShow = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.auth.user)
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token)
  const songs = useSelector(state => state.songs)
  const sections = useSelector(state => state.sections)
  const instruments = useSelector(state => state.instruments)
  const location = useLocation()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const history = useHistory()

  return (
    <div className={classes.root}>

     <Grid style={{ marginTop: '50px', marginBottom: '20px' }} container justify="flex-start" >
       <Grid item xs={10}>
          <Typography className={classes.title} component="p" variant="h3" gutterBottom>Library Stats</Typography>
        </Grid>
      {matches
        ? null
        : <Grid item xs={12}>
          <Tabs className={classes.tabContainer}>
            <Tab label="Progress" onClick={() => history.push('progress')} className={classes.tab}/>
            <Tab label="Favorites" onClick={() => history.push('favorites')} className={classes.tab}/>
            <Tab label="Timing" onClick={() => history.push('timing')} className={classes.tab}/>
            <Tab label="Audio Preferences" onClick={() => history.push('audioPreferences')} className={classes.tab}/>
            <Tab label="Manage Account" onClick={() => history.push('edit')} className={classes.tab}/>
          </Tabs>
        </Grid>
      }
      <Switch>
          <PrivateRoute exact path="/users/:id/progress">
             <UserMetrics songs={Object.values(songs)} sections={Object.values(sections)}/>
          </PrivateRoute>
          <PrivateRoute exact path="/users/:id/favorites">
             <UserMetrics songs={Object.values(songs)} sections={Object.values(sections)}/>
          </PrivateRoute>
          <PrivateRoute exact path="/users/:id/timing">
             <UserMetrics songs={Object.values(songs)} sections={Object.values(sections)}/>
          </PrivateRoute>
          <PrivateRoute exact path="/users/:id/audioPreferences">
             <UserMetrics songs={Object.values(songs)} sections={Object.values(sections)}/>
          </PrivateRoute>
          <PrivateRoute exact path="/users/:id/edit">
              <UserEdit />
          </PrivateRoute>
      </Switch>
      </Grid>
    </div>
  )
}

export default UserShow
