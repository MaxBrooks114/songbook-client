import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import PrivateRoute from '../PrivateRoute';
import UserEdit from './UserEdit'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import UserMetrics from './UserMetrics'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { NavLink, Switch, useLocation} from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';


const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.info.main,
    minHeight: '100vh',
    display: 'flex',
  
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '4 rem',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },

  title:{
    width: '100%'
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
    flexDirection: 'column',
  },

  drawerPaper: {
    background: theme.palette.common.gray,
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    marginRight: 12,
    zIndex: theme.zIndex.modal +1
  },

  fixedHeight: {
    height: 240,
  },

  songCard: {
    background: theme.palette.primary.main,
    borderRadius: 4
  }
}));

const UserShow = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token);
  const songs = useSelector(state => state.songs)
  const sections = useSelector(state => state.sections)
  const instruments = useSelector(state => state.instruments)
  const location = useLocation()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  

  return (
    <div className={classes.root}>
       {matches ? null :  
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}    
      > 
     
      <List style={{position: 'fixed'}}>
          <ListItem style={{marginTop: '6rem'}}>
            <NavLink to="progress">Progress</NavLink>
          </ListItem>
          <Divider />
          <ListItem>
            <NavLink to="favorites">Favorites</NavLink>
          </ListItem>
          <Divider />
          <ListItem>
            <NavLink to="timing">Timing</NavLink>
          </ListItem>
          <Divider />
          <ListItem>
            <NavLink to='audioPreferences'>Audio Preferences</NavLink>
          </ListItem>
          <Divider />
          <ListItem>
            <NavLink to='edit'>Manage Account</NavLink>
          </ListItem>
          <Divider />
      </List>
      </Drawer>}
     <Grid style={{marginTop: '50px', marginBottom: '20px'}} container direction="column">
      <Typography  className={classes.title} component="p" variant="h3">{user.username}'s Songbook</Typography>
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
  );
};

export default UserShow;
