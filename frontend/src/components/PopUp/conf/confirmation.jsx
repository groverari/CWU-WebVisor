import React, { useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

import { Button, DialogContent, DialogContentText, Slide } from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

/**
 *
 * This Builds a confirmation pop up that will ask the user to acknowledge whatever the calling component wants
 * Parameters:
 *  onClose: FUNCTION : a function that will set the "open" parameter to false in the parent component
 *  yesClick: FUNCTION : a function that will continue with the action that needed to be done
 *  message: STRING : the content of the message
 *  button_text: STRING : the string of text that will display in the button
 *  open: BOOLEAN:  determines when popup will open
 */

function Confirmation({ onClose, yesClick, message, button_text, open }) {
  return (
    <Dialog
      TransitionComponent={Transition}
      onClose={onClose}
      open={open}
      align="center"
      sx={{ left: '25%' }}
    >
      <DialogTitle>Are You Sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <br />
        <Button onClick={onClose} variant="contained">
          Take Me Back
        </Button>
        <Button onClick={yesClick}>{button_text}</Button>
      </DialogContent>
    </Dialog>
  )
}

export default Confirmation
