import React, { useState } from 'react'
import './ConfPopUp.styles.scss'

const ConfPopUp = ({ action, onButtonClick, onClose }) => {

  const handleButtonClick = (buttonValue)=>{
    onButtonClick(buttonValue);
    onClose();
    //setShowPopup(false); // Add this line to hide the popup
  }

  return (
    <div>
      <div className="popup">
        <div className="popup-content">
          <h1>Please Confirm</h1>
          <p>Are you sure you want to {action}?</p>
          <button
            onClick={() => {
              handleButtonClick(true)
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              handleButtonClick(false)
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfPopUp
