import React, { useState } from 'react';
import './confPopUp.styles.scss';

const confPopUp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={togglePopup}>Open Popup</button>
      {isOpen && (
        <div className='popup'>
          <div className='popup-content'>
            <h1>Popup Content</h1>
            <p>This is the content of the pop-up.</p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default confPopUp;