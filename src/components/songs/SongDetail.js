
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Slide from '@material-ui/core/Slide'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AudioProperties from './AudioProperties'
import NavRow from '../sharedDetails/NavRow'
import DetailTitle from '../sharedDetails/DetailTitle'
import DeleteDialog from '../sharedDetails/DeleteDialog'
import Features from '../sharedDetails/Features'
import Lyrics from '../sharedDetails/Lyrics'
import SongSections from './SongSections'
import VertMenu from '../sharedDetails/VertMenu'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    transition: '.3s ease',
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    position: 'relative',
    marginBottom: '8rem',
    padding: 22
  },
  details: {
    color: theme.palette.info.main
  },

  vert: {
    padding: 0,
    position: 'absolute',
    right: '1%',
    top: 22
  }

}))

const SongDetail = () => {
  const params = useParams()
  const song = useSelector(state => state.songs[params.id])
  
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const popped = Boolean(anchorEl)

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return song
    ? (
    <Slide in transition={1000}>
      <Paper className={classes.root} elevation={3}>
        <Grid container alignItems="center" justify="flex-start" className={classes.details}>
          <IconButton
              className={classes.vert}
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={(event) => handleMenuClick(event)}
          > <MoreVertRoundedIcon />
          </IconButton>
          <VertMenu
              song={song}
              popped={popped}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              setOpen={setOpen}
          />
          <Grid item xs={12}>
            <DetailTitle song={song}/>
          </Grid>
          <Grid item xs={6} md={3} >
            <NavRow song={song}/>
          </Grid>
          <Grid item xs={12}>
            <Features song={song} />
            <SongSections song={song}/>
            {song.spotify_url
              ? <AudioProperties song={song} />
              : null }
            <Lyrics lyrics={song.lyrics} />
          </Grid>
        </Grid>
        <DeleteDialog song={song} open={open} setOpen={setOpen} message="By deleting this song you will also delete all affiliated sections."/>
      </Paper>
    </Slide>
      )
    : null
}

export default React.memo(SongDetail)
