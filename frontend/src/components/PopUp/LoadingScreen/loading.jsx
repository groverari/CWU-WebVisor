import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import "./loading.styles.scss";

import { Button, DialogContent, DialogContentText, Slide } from "@mui/material";
// Transition component for the Dialog

/**
 * {The code defines a LoadingScreen component that displays a
 * loading screen or progress indicator inside a dialog box.
 * It uses the Dialog and related components from the Material-UI
 * library to implement the dialog functionality. The Transition
 * component is used to control the animation when the dialog is
 * opened or closed. The LoadingScreen component receives a prop open
 *  which determines whether the loading screen should be displayed or
 * not. Inside the dialog content, it shows a message "Just a second"
 * and a loading indicator element with the class name "loading" and
 * "loading--full-height" for styling purposes.}
 */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// LoadingScreen component
function LoadingScreen({ open }) {
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      align="center"
      sx={{ left: "25%" }}
    >
      <DialogTitle>Working On It</DialogTitle>
      <DialogContent>
        <DialogContentText>Just a second</DialogContentText>
        <div className="loading loading--full-height"></div>
      </DialogContent>
    </Dialog>
  );
}

export default LoadingScreen;
