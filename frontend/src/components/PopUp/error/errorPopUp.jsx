import React, { useState } from 'react';
import './ErrorPopUp.styles.scss';

const ErrorPopUp = ({popUpContent}) => {

  const handleErrorButtonClick = () => {
    onErrorClose();
  };

  return (
    <div>
      <div className='popup'>
        <div className='popup-content'>
          <h1>There was a databse error</h1>
          <p>{popUpContent}</p>
          <button onClick={handleErrorButtonClick}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopUp;