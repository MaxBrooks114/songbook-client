import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import userMetricsDemo from '../../assets/userMetricsDemo.mp4'
import SongsDemo from '../../assets/SongsDemo.mp4'
import InstrumentDemo from '../../assets/InstrumentDemo.mp4'
import SectionDemo from '../../assets/SectionDemo.mp4'
import IntegrateSpotifyDemo from '../../assets/IntegrateSpotifyDemo.js.mp4'
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import piano from '../../assets/piano.png'
import music from '../../assets/music.png'
import dashboard from '../../assets/dashboard.png'
import sheetmusic from '../../assets/sheetmusic.png'
import Spotify_Icon_RGB_Green from '../../assets/Spotify_Icon_RGB_Green.png'
import { useHistory  } from 'react-router-dom';
import Blurb from './Blurb'
import * as workerTimers from 'worker-timers';

const useStyles = makeStyles((theme) => ({


  root:{
    minHeight: '100vh',
    marginBottom: 50,
     [theme.breakpoints.down('md')]: {
          marginBottom: 25
      },
  },

  hero: {
    padding: '5rem 0',
    background: theme.palette.primary.main,
    textAlign: 'left',
    color: theme.palette.info.main,
    
  },

  title: { 
    fontWeight: 600,
    fontSize: '2.8rem',
    [theme.breakpoints.down('md')]: {
          fontSize: '2.5rem'
      },
    [theme.breakpoints.down('sm')]: {
          fontSize: '2rem'
      },
    [theme.breakpoints.down('xs')]: {
          fontSize: '1.2rem'
      },
  },

  subtitle: {
    [theme.breakpoints.down('md')]: {
          fontSize: '1.5rem'
      },
    [theme.breakpoints.down('sm')]: {
          fontSize: '.8rem'
      },
    [theme.breakpoints.down('xs')]: {
          fontSize: '.8rem'
      },
  },

  graphic: {
  
    width: '100%',
    cursor: 'pointer',
     '&:hover': {
        filter: 'brightness(120%) drop-shadow(0px 3px 15px rgba(0,0,0,.2))'
     }
    
    
  },

  cta: {
    color: theme.palette.background.default,
    background: theme.palette.common.darkGreen,
    height: 60,
    width: '100%',
    minWidth: 200,
    maxWidth: 337,
    boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
    '&:hover':{
      background: theme.palette.background.default,
      color: theme.palette.common.darkGreen,

    }
  },


}));
const Home = () => {
  const classes = useStyles()
  const pngs = [music, sheetmusic, piano, dashboard, Spotify_Icon_RGB_Green ]
  const [blurbShow, setBlurbShow] = useState(0)
  const user = useSelector(state => state.auth.user)
  const history = useHistory()
  const blurbs = [
    {
      title: 'Songs',
      subtitle: 'Add your own or Import from Spotify',
      desc: 'Use a form to add a song. This way of adding songs is most useful for your own original music. You can add additional details for your song including key, mode, tempo, lyrics, and your own album artwork! Alternatively, you can import any song from Spotify by typing a query into the search bar above. Importing a song  will give you access to specific metrics from Spotify’s own database, which in turn can be used to discover trends in the music you like, but more on that later. Another great feature of importing from Spotify is that the song is automatically segmented into sections for you.',
      video: SongsDemo
    },
    {
      title: 'Sections',
      subtitle: 'The building blocks of music',
      desc: 'In music, a section is defined as a complete, but not independent, musical idea. Examples of sections include verse, chorus, bridge, solo etc. This idea is explored in Songbook in the way that songs contain various sections that you as a musician either write, or learn. For every song you add, you can add any number of sections and information on that section such as the key, mode, tempo, start, duration, lyrics, etc.. Furthermore Songbook gives you access to tools such as a metronome, an audio recorder, the ability to upload sheet music/ tabs, and more!',
      video: SectionDemo
    },
    {
      title: 'Instruments',
      subtitle: 'Tools of the Trade',
      desc: 'A more optional feature of SongBook, you can add any instrument you can think of and link it to any section you want. Perfect for multi-instrumentalists who know a section or song on more than one instrument. When viewing any particular instrument, you can see a list of all songs and sections you know on that instrument.',
      video: InstrumentDemo
    },
    {
      title: 'Profile',
      subtitle: 'Uncover Trends In your own Tastes',
      desc: `SongBook keeps track of all the music you add and aggregates all that data to tell you more about your musical taste, as well as track your progress. Everything from how many songs you have added to your favorite artists can be found in your profile section of SongBook. Furthermore, every song imported from Spotify has the following audio metrics: Valence, Energy, Acousticness, Danceability, Instrumentalness, Speechiness and Loudness among others. SongBook tracks your preferences for those too to see what kind of music you prefer how to play.`,
      video: userMetricsDemo
    },
    {
      title: 'Deeper Integration with Spotify',
      subtitle: '(Premium members only)',
      desc: 'If you have Spotify premium you can give SongBook access to your Spotify player. You can do this by hitting the “integrate spotify” button found on the filter drawer on the list pages or the manage account page. Once you do this you will see play buttons on every song or section you imported through Spotify. This is especially useful for playing along with songs, sections when learning covers.' ,
      video: IntegrateSpotifyDemo
    },

  ]

  useEffect(() => {
    const intervalId = workerTimers.setInterval(() => {
      if(blurbShow === 4) {
        setBlurbShow(0) 
      } else {
         setBlurbShow(blurbShow + 1)
      }   
    }, 60000) 

    return () => {
      workerTimers.clearInterval(intervalId) 
    }
  })
  const renderSvgs = () => {
     return pngs.map((png, index) => {
       return (
          <Grid key={index} item xs={2} lg={1}>
            <img onClick={() =>setBlurbShow(index)} className={classes.graphic} src={png} alt={`${png}`}/>
          </Grid>
       )
     })
   }

  return (
    <div className={classes.root}>
        <Grid container justify="space-around"  alignItems="center" className={classes.hero}>
          <Grid item xs={10} md={6}>
            <Typography variant="h2" className={classes.title} gutterBottom>Welcome To SongBook</Typography>
            <Typography variant="subtitle1" gutterBottom className={classes.subtitle}>SongBook is a musical library web app for musicians to keep track of their song repertoire, instrument collection, and learning progress. </Typography>
          </Grid>
          <Grid item xs={10} md={5} style={{textAlign: 'center'}}>
            <Button className={classes.cta} onClick={() => {
              user ? history.push('/search') : history.push('/register')
            }}>
               <span style={{fontWeight: 600}}>{ user ? "Start Adding Songs Now" : "Register Now"}</span>
            </Button>
          </Grid>
        </Grid>
        <Grid style={{margin: '2rem 0'}} container justify="space-evenly" alignItems="center">
          {renderSvgs()}
        </Grid>
        <Blurb blurb={blurbs[blurbShow]}/>
    </div>
  )
}

export default Home
