import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toggleAlert } from "../../redux/actions"

import "./styles.css"

export default function Alert() {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  if (!alert || !alert.text) {
    return null;
  }

  const { text, action } = alert;

  return (
    <div className='alert-modal'>
      <div className='alert'>
        <div>{text}</div>
        <div>
          <button onClick={() => dispatch(toggleAlert("", null))}>Cancel</button>
          <button
            onClick={() => {
              dispatch(action)
              dispatch(toggleAlert("", null))
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
