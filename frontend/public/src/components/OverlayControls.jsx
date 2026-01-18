import { useState } from "react";

const OverlayControls = ({ addOverlay }) => {
  const [text, setText] = useState("");

  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Overlay text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => addOverlay(text)}>Add Overlay</button>
    </div>
  );
};

export default OverlayControls;
