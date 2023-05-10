import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

function ClassSelectorCard({ title, handleChange }) {
  return (
    <div>
      <h3>{title}</h3>
      <button
        onClick={() => {
          handleChange
        }}
      >
        <AiOutlineClose />
      </button>
    </div>
  )
}

export default ClassSelectorCard
