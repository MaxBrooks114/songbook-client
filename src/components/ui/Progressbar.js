import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(10)
    },
    position: 'fixed'
  }
}))

const Progressbar = () => {
  const classes = useStyles()
  const loading = useSelector((state) => state.loading.loading)

  const renderBar = () => {
    return loading ? <LinearProgress variant="indeterminate" color="secondary" /> : ''
  }

  return <div className={classes.root}>{renderBar()}</div>
}

export default Progressbar
