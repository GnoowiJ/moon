import React from "react";

export default function RevCounter({
  handleInput,
  name,
  value,
  min,
  max,
  message,
}) {
  return (
    <div>
      <button
        type="button"
        className="rev-counter-btn"
        name={name}
        value={value}
        onClick={(e) => handleInput(e, min, max, -1)}
      >
        -
      </button>
      <input
        className="rev-nop-input"
        type="number"
        name={name}
        onChange={(e) => handleInput(e, min, max)}
        value={value}
      />
      <button
        type="button"
        className="rev-counter-btn"
        name={name}
        value={value}
        onClick={(e) => handleInput(e, min, max, 1)}
      >
        +
      </button>{" "}
      <span className="rev-essential">{message}</span>
    </div>
  );
}
