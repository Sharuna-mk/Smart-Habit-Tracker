import React, { useState } from 'react'

function Colorpicker({ value }) {

  const [color, setColor] = useState("#FFFFFF")

  const handleChange = (e) => {
    setColor(e.target.value)
  }
  return (
    <>
      <div className="color-picker-container">
        <div className="color-display">
          <input type="color" onChange={handleChange} value={value} />

        </div>
      </div>
    </>
  )
}

export default Colorpicker
