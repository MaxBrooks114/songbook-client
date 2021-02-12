
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Slide from '@material-ui/core/Slide'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { deleteSection} from '../../actions/sections'
import { millisToMinutesAndSeconds } from '../../helpers/detailHelpers'
import DeleteDialog from '../sharedDetails/DeleteDialog'
import DetailTitle from '../sharedDetails/DetailTitle'
import Features from '../sharedDetails/Features'
import Lyrics from '../sharedDetails/Lyrics'
import NavRow from '../sharedDetails/NavRow'
import VertMenu from '../sharedDetails/VertMenu'
import SectionFiles from './SectionFiles'
import SectionInstruments from './SectionInstruments'
import SectionMetronome from './SectionMetronome'
import SectionRecorder from './SectionRecorder'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    position: 'sticky',
    padding: 22,
    marginBottom: '8rem'
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

const SectionDetail = () => {
  const params = useParams()
  const section = useSelector(state => state.sections[params.id])
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const popped = Boolean(anchorEl)

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }


  return section
    ? (
        <Slide direction="up" mountOnEnter unmountOnExit in transition={150}>
          <Paper className={classes.root} elevation={3}>
            <Grid container alignItems="center" className={classes.details}>
                <IconButton
                    className={classes.vert}
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleMenuClick(event)}
                > <MoreVertRoundedIcon />
                </IconButton>
                <VertMenu
                  section={section}
                  objectType="sections"
                  popped={popped}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  setOpen={setOpen}
                />
                <Grid item xs={12}>
                   <DetailTitle 
                      title={section.name} 
                      subtitle1={`(${millisToMinutesAndSeconds(section.start)}-${millisToMinutesAndSeconds(section.start + section.duration)}) (${millisToMinutesAndSeconds(section.duration)})`} 
                      section={section}
                      image={section.song.image}
                      album={section.song.album}
                      spotifyUri={section.song.spotify_url}
                      subtitle2={<Link className={classes.link} to={`/songs/${section.song.id}`}>{section.song.title}</Link>}

                      />
                </Grid>
                <Grid item xs={3} >
                    <NavRow section={section}/>
                </Grid>
                <Grid item xs={12}>
                  <Features objectType="section" section={section}/>
                  <Lyrics lyrics={section.lyrics}/>
                  <SectionInstruments section={section} />
                  <SectionMetronome section={section} />
                  <SectionRecorder section={section}/>
                  <SectionFiles section={section} fileType="recording"/>
                  <SectionFiles section={section} fileType="sheet music/tabs"/>
                </Grid>
              </Grid>
           <DeleteDialog item={section} deleteFuntion={deleteSection} open={open} setOpen={setOpen} message1="Are you sure you want to delete this section?" message2="You will no longer have access to any of its data which includes any associated recordings and sheet music, you can always create it again."/>
      </Paper>
    </Slide>
      )
    : null
}

export default React.memo(SectionDetail)
