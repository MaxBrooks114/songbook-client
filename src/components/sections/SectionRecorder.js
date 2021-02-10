import React from 'react'
import DetailAccordion from '../sharedDetails/DetailAccordion'
import RecordView from '../RecordView'
import Grid from '@material-ui/core/Grid'

const SectionRecorder = ({section}) => {

  const renderRecorder = () => {
    return (
      <Grid item xs={12}>
        <RecordView className="recorder" key={section.id} />
      </Grid>
    )
  }
  return (
      <DetailAccordion title="Record Yourself" renderFunction={renderRecorder} />
  )
}

export default SectionRecorder
