import React, { useState } from 'react'
import Picker from 'emoji-picker-react';
import { MdAdd } from "react-icons/md";

function Addemoji({ chosenEmoji, setChosenEmoji,
  showPicker, setShowPicker }) {

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject.emoji);
    setShowPicker(false);
  };
  return (
    <div>
      <button type='button' style={{ backgroundColor: "lightblue" }}
        className='btn card ms-5 mt-5 text-dark fw-bolder fs-5'
        onClick={() => setShowPicker(!showPicker)}>

        {chosenEmoji || <MdAdd />
        }
      </button>

      {showPicker && <div>
        <Picker onEmojiClick={onEmojiClick} />
      </div>}
    </div>
  )
}

export default Addemoji
