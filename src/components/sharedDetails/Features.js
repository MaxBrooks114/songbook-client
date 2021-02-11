import Grid from '@material-ui/core/Grid'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

import keys from '../../dataToImport/keys'
import modes from '../../dataToImport/modes'
import { renderBool, renderText, titleCase } from '../../helpers/detailHelpers'
import DetailAccordion from './DetailAccordion'

const useStyles = makeStyles((theme) => ({

  info: {
    fontSize: '.9rem'
  }

}))
const Features = ({ song, section }) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const item = song || section

  const features = song ? ['genre', 'key', 'tempo', 'time_signature', 'explicit', 'original'] : ['key', 'tempo', 'time_signature', 'learned']

  const renderInfo = (item, feature) => {
    switch (true) {
      case feature === 'key':
        return `${renderText(keys, item.key)} ${renderText(modes, item.mode)}`
      case feature === 'tempo':
        return <>{item[feature]} BPM</>
      case typeof item[feature] === 'boolean':
        return renderBool(item[feature])
      case feature === 'time_signature':
        return `${item[feature]}/4`
      default:
        return item[feature]
    }
  }

  const renderFeatures = () => {
    return features.map((feature, index) => {
      return index % 2 === 0
        ? (<React.Fragment key={index}>
        <Grid item xs={2} />
          <Grid item xs={5}>
            <Typography  variant={matches ? 'caption' : 'subtitle1' }>{titleCase(feature)}: <span className={classes.info}>{renderInfo(item, feature)}</span></Typography>
          </Grid> </React.Fragment>)
        : <Grid item xs={5} key={index}>
            <Typography  variant={matches ? 'caption' : 'subtitle1' }>{titleCase(feature)}: <span className={classes.info}>{renderInfo(item, feature)}</span></Typography>
          </Grid>
    })
  }

  return (
    <DetailAccordion title="Features" renderFunction={renderFeatures} />
  )
}

export default Features
