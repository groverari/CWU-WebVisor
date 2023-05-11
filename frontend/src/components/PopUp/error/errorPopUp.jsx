import React, { useState } from 'react';
import './ErrorPopUp.styles.scss';

const ErrorPopUp = ({popUpContent}) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <div className='popup'>
          <div className='popup-content'>
            <h1>There was a databse error</h1>
            <p>{popUpContent}</p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorPopUp;