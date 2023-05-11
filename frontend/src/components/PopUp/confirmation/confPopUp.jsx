import React, { useState } from 'react'
import './ConfPopUp.styles.scss'

const ConfPopUp = ({ action }) => {
  const [isOpen, setIsOpen] = useState(true)

  const [isConfirmed, setConfirmation] = useState(false)

  const handleConfirmation = (confirmed) => {
    setConfirmation(confirmed)
  }

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h1>Please Confirm</h1>
            <p>Are you sure you want to {action}?</p>
            <button
              onClick={() => {
                handleConfirmation(true)
                togglePopup()
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                handleConfirmation(false)
                togglePopup()
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
      {isConfirmed}
    </div>
  )
}

export default ConfPopUp
