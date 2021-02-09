import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Grid from '@material-ui/core/Grid'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

import { renderBool, renderText } from '../../helpers/detailHelpers'
import keys from './keys'
import modes from './modes'

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

  accordion: {
    background: theme.palette.primary.light,
    color: theme.palette.info.main,
    borderRadius: 4,
    margin: '1rem 0',
    '& .MuiAccordionSummary-content': {
      flexGrow: 0
    },

    '& .MuiAccordionSummary-root': {
      justifyContent: 'space-between'
    },

    '& .MuiAccordionDetails-root': {
      padding: 0,
      marginBottom: theme.spacing(2)
    },

    '& .MuiGrid-grid-xs-10': {
      margin: 0,
      justifyContent: 'center'
    }
  },

  accordionTitle: {
    fontWeight: '500'
  }

}))
const SongFeatures = ({ song }) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography className={classes.accordionTitle}>Song Features</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* The way to render each of these song features is different enough that I don't want to throw them in a map statement */}
        <Grid container alignItems="center">
          <Grid item xs={2}/>
          <Grid item xs={5}>
            <Typography variant={matches ? 'caption' : 'subtitle1' }>Genre: <span style={{ fontSize: '.9rem' }}>{song.genre}</span></Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant={matches ? 'caption' : 'subtitle1' }>Key: <span style={{ fontSize: '.9rem' }}>{renderText(keys, song.key)} {renderText(modes, song.mode)}</span></Typography>
          </Grid>
          <Grid item xs={2}/>
          <Grid item xs={5}>
            <Typography variant={matches ? 'caption' : 'subtitle1' }>Tempo: <span style={{ fontSize: '.9rem' }}>{song.tempo}</span> BPM</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant={matches ? 'caption' : 'subtitle1' }>Meter: <span style={{ fontSize: '.9rem' }}>{song.time_signature}/4</span></Typography>
          </Grid>
          <Grid item xs={2}/>
          <Grid item xs={5}>
            <Typography variant={matches ? 'caption' : 'subtitle1' } >Explicit: <span style={{ fontSize: '.9rem' }}>{renderBool(song.explicit)}</span></Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant={matches ? 'caption' : 'subtitle1' }>Original: <span style={{ fontSize: '.9rem' }}>{renderBool(song.original)}</span></Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default SongFeatures
