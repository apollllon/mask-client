import React, { useEffect, useState } from 'react';
import './App.css';
import { Typography, makeStyles, AppBar, Toolbar, Fab } from '@material-ui/core';
import { theme } from './materialui/theme';
import { MaskStatus } from './entity/MaskStatus';
import MicIcon from '@material-ui/icons/Mic';
// 笑顔
// import MoodIcon from '@material-ui/icons/Mood';
// 嫌な顔
// import MoodBadIcon from '@material-ui/icons/MoodBad';
// 普通の顔
// import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import { useGetMaskStatus } from './api/getMaskStatus';
import TempWidget from './components/TempWidget';
import HumWidget from './components/HumWidget';
import SmellWidget from './components/SmellWidget';
import UploadWidget from './components/UploadeWidget';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#eff0f3',
    height: '100vh'
  },
  title: {
    color: theme.palette.common.white,
    fontWeight: 'bold'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: '50%',
    transform: "translate(-50%, 0)"
  },
})

function App() {
  const classes = useStyles()
  const [status, setStatus] = useState<MaskStatus>({ temp: 0, hum: 0, smell: 0 })
  const apiSet = useGetMaskStatus()

  setInterval(() => {
    apiSet.execute()
  }, 1000)

  useEffect(() => {
    setStatus(apiSet.response)
  }, [apiSet.response])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Iot Mask
          </Typography>
        </Toolbar>
      </AppBar>
      <SmellWidget smell={status.smell} />
      <TempWidget temp={status.temp} />
      <HumWidget hum={status.hum} />
      <UploadWidget />
      <Fab className={classes.fab} color="primary" aria-label="add">
        <MicIcon />
      </Fab>
    </div>
  );
}

export default App;
