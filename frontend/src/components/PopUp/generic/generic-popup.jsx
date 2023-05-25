import React, { useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

import { Button, DialogContent, DialogContentText, Slide } from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function GenericPopUp({ onClose, message, title, open }) {
  return (
    <Dialog
      TransitionComponent={Transition}
      onClose={onClose}
      open={open}
      align="center"
      sx={{ left: '25%' }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="success-text">{message}</DialogContentText>
        <br />
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default GenericPopUp
