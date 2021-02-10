import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

import DetailAccordion from './DetailAccordion'

const useStyles = makeStyles((theme) => ({

  lyrics: {
    textTransform: 'none'
  }

}))

const Lyrics = ({ lyrics }) => {
  const classes = useStyles()

  const renderLyrics = () => {
    return (
      <Grid container justify="space-around">
        <Grid item xs={10}>
          <Typography className={classes.lyrics}>{lyrics}</Typography>
        </Grid>
      </Grid>
    )
  }
  return (
    <DetailAccordion title="Lyrics" renderFunction={renderLyrics}/>
  )
}

export default Lyrics
