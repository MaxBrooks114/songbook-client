import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { setToken } from '../../actions/spotify';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    // marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },
}));

const UserShow = ({ match }) => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.spotifyUser.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToken(match.params.accessToken));
  }, [dispatch, match.params.accessToken]);

  const spotifyLoginButton = () => {
    return accessToken ? '' : <a href="http://localhost:8000/spotify/login">Integrate with Spotify</a>;
  };

  return (
    <div>
      <h1>{user.username}'s Songbook</h1>
      {spotifyLoginButton()}
    </div>
  );
};

export default UserShow;
