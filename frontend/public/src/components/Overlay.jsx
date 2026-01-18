import Draggable from "react-draggable";

const Overlay = ({ data, onUpdate, onDelete }) => {
  return (
    <Draggable
      defaultPosition={{ x: data.position.x, y: data.position.y }}
      onStop={(e, pos) =>
        onUpdate(data._id, {
          position: { x: pos.x, y: pos.y }
        })
      }
    >
      <div className="overlay-box">
        {data.content}
        <button onClick={() => onDelete(data._id)}>✖</button>
      </div>
    </Draggable>
  );
};

export default Overlay;
