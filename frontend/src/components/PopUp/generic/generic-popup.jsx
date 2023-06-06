import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { Button, DialogContent, DialogContentText, Slide } from "@mui/material";
// Transition component for the Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// GenericPopUp component
/**
 *
 * @param {The code defines a GenericPopUp component that displays a dialog box with a
 *  title, message, and a close button. It uses the Dialog and related components from
 * the Material-UI library to implement the dialog functionality. The Transition component
 *  is used to control the animation when the dialog is opened or closed. The GenericPopUp
 *  component receives props such as onClose (callback for closing the dialog), message
 * (the content of the dialog), title (the title of the dialog), and open (boolean indicating
 * whether the dialog is open or not).} param0
 * @returns
 */
function GenericPopUp({ onClose, message, title, open }) {
  return (
    <Dialog
      TransitionComponent={Transition}
      onClose={onClose}
      open={open}
      align="center"
      sx={{ left: "25%" }}
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
  );
}

export default GenericPopUp;
