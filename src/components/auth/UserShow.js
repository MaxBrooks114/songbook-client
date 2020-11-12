import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {favorite, favoriteInstrument, elementsLearned, attrPreference, minAttr, maxAttr} from '../../helpers/userMetrics'
import {renderText, millisToMinutesAndSeconds, sec2time} from '../../helpers/detailHelpers'
import modes from '../songs/modes';
import keys from '../songs/keys';

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

const UserShow = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token);
  const songs = useSelector(state => state.songs)
  const elements = useSelector(state => state.elements)
  const instruments = useSelector(state => state.instruments)
  let metrics = [];
  if (Object.values(songs).length && Object.values(instruments).length && Object.values(elements).length) {
    metrics = [{
      title: "Songs",
      data: Object.values(songs).length
    }, {
      title: "Instruments",
      data: Object.values(instruments).length
    },
    {
      title: "Elements",
      data: Object.values(elements).length},
    {
      title: "Elements Learned",
      data: elementsLearned(Object.values(elements))
    },
    {
      title: "Favorite Instrument",
      data: favoriteInstrument(Object.values(elements), Object.values(instruments))
    },
    {
      title: "Favorite Genre",
      data: favorite(Object.values(songs), 'genre')
    },
    {
      title: "Favorite Key",
      data: renderText(keys, favorite(Object.values(elements), 'key'))
    },
    {
      title: "Favorite Mode",
      data: renderText(modes, favorite(Object.values(elements), 'mode'))
    },
    {
      title: "Favorite Artist",
      data: favorite(Object.values(songs), 'artist')
    },
    {
      title: "Valence Preference",
      data: attrPreference(Object.values(songs), 'valence')
    },
    {
      title: "Instrumentalness Preference",
      data: attrPreference(Object.values(songs), 'instrumentalness')
    },
    {
      title: "Energy Preference",
      data: attrPreference(Object.values(songs), 'energy')
    },
    {
      title: "Speechiness Preference",
      data: attrPreference(Object.values(songs), 'speechiness')
    },
    {
      title: "Liveness Preference",
      data: attrPreference(Object.values(songs), 'liveness')
    },
    {
      title: "Shortest Song",
      data: `${minAttr(Object.values(songs), 'duration').title} (${millisToMinutesAndSeconds(minAttr(Object.values(songs), 'duration').duration)})`
    },
    {
      title: "Shortest Element",
      data: `${minAttr(Object.values(elements), 'duration').name} of ${minAttr(Object.values(elements), 'duration').song.title} (${sec2time(minAttr(Object.values(elements), 'duration').duration)})`
    }, {
      title: "Longest Song",
      data: `${maxAttr(Object.values(songs), 'duration').title} (${millisToMinutesAndSeconds(maxAttr(Object.values(songs), 'duration').duration)})`
    },
    {
      title: "Longest Element",
      data: `${maxAttr(Object.values(elements), 'duration').name} of ${maxAttr(Object.values(elements), 'duration').song.title} (${ sec2time(maxAttr(Object.values(elements), 'duration').duration)})`
    },
    {
      title: "Fastest Song",
      data: `${maxAttr(Object.values(songs), 'tempo').title} (${(maxAttr(Object.values(songs), 'tempo').tempo)}) BPM`
    },
    {
      title: "Fastest Element",
      data: `${maxAttr(Object.values(elements), 'tempo').name} of ${maxAttr(Object.values(elements), 'tempo').song.title} (${(maxAttr(Object.values(elements), 'tempo').tempo)}) BPM`
    },
    {
      title: "Slowest Song",
      data: `${minAttr(Object.values(songs), 'tempo').title} (${(minAttr(Object.values(songs), 'tempo').tempo)}) BPM`
    },
    {
      title: "Slowest Element",
      data: `${minAttr(Object.values(elements), 'tempo').name} of ${minAttr(Object.values(elements), 'tempo').song.title} (${(minAttr(Object.values(elements), 'tempo').tempo)}) BPM`
    },

   ]
  }
  

  const spotifyLoginButton = () => {
    return accessToken && accessToken !== '' ? (
      ''
    ) : (
      <a href={`http://localhost:8000/api/spotify/login/${user.id}`}>Integrate with Spotify</a>
    );
  };

  return (
    <div className={classes.root}>
      <h1>{user.username}'s Songbook</h1>
      <Grid
        container
        spacing={4}
        >
        {metrics.map((metric, index) => {
         return (
           <Grid
             key={metric.title + index}
             item
             component={Card}
             lg={3}
             sm={6}
             xl={3}
             xs={12}
           >
            {metric.title} <br/>
            {metric.data}
           </Grid>)
           })}
      </Grid>
      {spotifyLoginButton()}
      <Link className={classes.link} to={`${user.id}/edit`}>
          <Button className={classes.button}>Edit </Button>
      </Link>
    </div>
  );
};

export default UserShow;
