import React from 'react'
import DetailAccordion from '../sharedDetails/DetailAccordion'
import './metronome.css'
import Metronome from '@kevinorriss/react-metronome'
import Grid from '@material-ui/core/Grid'




const SectionMetronome = ({section}) => {

  const renderMetronome = () => {
    return (
      <Grid item xs={12}>
        <Metronome key={section.id} startBpm= {section.tempo}/>
      </Grid>
    )
  }

  return (
    <DetailAccordion title="Metronome" renderFunction={renderMetronome}/>
  )
}

export default SectionMetronome
