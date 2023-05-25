import React, { useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import './loading.styles.scss'

import { Button, DialogContent, DialogContentText, Slide } from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function LoadingScreen({ open }) {
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      align="center"
      sx={{ left: '25%' }}
    >
      <DialogTitle>Working On It</DialogTitle>
      <DialogContent>
        <DialogContentText>Just a second</DialogContentText>
        <div className="loading loading--full-height"></div>
      </DialogContent>
    </Dialog>
  )
}

export default LoadingScreen
