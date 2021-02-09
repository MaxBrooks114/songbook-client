import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

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
  },

  lyrics: {
    textTransform: 'none'
  }

}))

const SongLyrics = ({ song }) => {
  const classes = useStyles()
  return (
    <Accordion className={classes.accordion} style={{ marginBottom: 0 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography className={classes.accordionTitle}>Lyrics</Typography>
      </AccordionSummary>
      <Grid item xs={12}>
          <AccordionDetails>
            <Grid container justify="space-around">
              <Grid item xs={10}>
                <Typography className={classes.lyrics}>{song.lyrics}</Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
      </Grid>
    </Accordion>
  )
}

export default SongLyrics
