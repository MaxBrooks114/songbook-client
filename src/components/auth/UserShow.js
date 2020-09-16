import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

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
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token);

  const spotifyLoginButton = () => {
    return accessToken && accessToken !== 'undefined' ? (
      ''
    ) : (
      <a href="http://localhost:8000/api/spotify/login">Integrate with Spotify</a>
    );
  };

  return (
    <div>
      <h1>{user.username}'s Songbook</h1>
      {spotifyLoginButton()}
    </div>
  );
};

export default UserShow;
