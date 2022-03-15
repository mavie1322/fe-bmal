import React from "react";

export function NoElement(props) {
  return (
    <div className='element-container'>
      <h3>{props.text}</h3>
    </div>
  );
}
