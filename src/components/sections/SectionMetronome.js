
import Metronome from '@kevinorriss/react-metronome'
import Grid from '@material-ui/core/Grid'
import React from 'react'

import DetailAccordion from '../sharedDetails/DetailAccordion'

const SectionMetronome = ({ section }) => {
  const renderMetronome = () => {
    return (
      <>
      <Grid item xs={3}/>
      <Grid item xs={6}>
        <Metronome
          playPauseStyle={{ background: '#f0f0f0', color: 'black', marginLeft: '1rem' }}
          bpmStyle= {{ fontFamily: 'Spartan' }}
          bpmTagStyle={{ fontFamily: 'Spartan' }}
          plusStyle	=	{{
            background: '#f0f0f0',
            color: 'black'
          }}
          minusStyle	=	{{
            background: '#f0f0f0',
            color: 'black'
          }}
          handleStyle={{ border: 'black' }}
          trackStyle={{ backgroundColor: 'black' }}
          railStyle={{ border: 'black' }}
          sliderStyle={{ border: 'black' }}
          key={section.id}
          startBpm={section.tempo}/>
      </Grid>
      <Grid item xs={3}/>
    </>
    )
  }

  return (
    <DetailAccordion title="Metronome" renderFunction={renderMetronome}/>
  )
}

export default SectionMetronome
