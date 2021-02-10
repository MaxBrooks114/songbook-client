import React from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Grid from '@material-ui/core/Grid'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles((theme) => ({

  accordion: {
    background: theme.palette.primary.light,
    color: theme.palette.info.main,
    borderRadius: 4,
    margin: '1rem 0',
    '& .MuiAccordionSummary-content': {
      flexGrow: 0
    },

    '& .MuiAccordionSummary-root': {
      justifyContent: 'space-between',
      padding: '0, 16'
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


  link: {
    textDecoration: 'none',
    color: theme.palette.info.main,
    '&:hover': {
      color: theme.palette.common.darkGreen
    }
  },

}))

const SectionInstruments = ({section}) => {
  const instruments = useSelector((state) =>
    Object.values(state.instruments).filter((instrument) => section.instruments.includes(instrument.id)))
  const classes = useStyles()

  const renderInstruments = (instruments) => {
    return instruments
      ? instruments.map((instrument) => {
        return (
            <Grid item xs={2}>
              <Typography>
                <Link className={classes.link} to={`/instruments/${instrument.id}`}>{instrument.name}</Link>
              </Typography>
            </Grid>
        )
      })
      : null
  }

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography className={classes.accordionTitle}>Instruments</Typography>
      </AccordionSummary>
      <Grid item xs={10}>
        <AccordionDetails>
          <Grid container align="center" justify="flex-start">
            {renderInstruments(instruments)}
          </Grid>
        </AccordionDetails>
      </Grid>
    </Accordion>
  )
}

export default SectionInstruments
