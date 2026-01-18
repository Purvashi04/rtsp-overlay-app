import { useEffect, useState } from "react";
import axios from "axios";
import VideoPlayer from "./components/VideoPlayer";
import Overlay from "./components/Overlay";
import OverlayControls from "./components/OverlayControls";

const API = "http://localhost:5000/api/overlays";

function App() {
  const [overlays, setOverlays] = useState([]);
  const [rtspUrl, setRtspUrl] = useState("");

  const fetchOverlays = async () => {
    const res = await axios.get(API);
    setOverlays(res.data);
  };

  useEffect(() => {
    fetchOverlays();
  }, []);

  const addOverlay = async (text) => {
    if (!text.trim()) {
      alert("Overlay text cannot be empty!");
      return;
    }

    await axios.post(API, {
      content: text,
      type: "text",
      position: { x: 50, y: 50 },
      size: { width: 150, height: 40 }
    });

    fetchOverlays();
  };

  const updateOverlay = async (id, data) => {
    await axios.put(`${API}/${id}`, data);
  };

  const deleteOverlay = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchOverlays();
  };

  return (
    <div className="app">
      <h2>RTSP Overlay Application</h2>

      <input
        type="text"
        placeholder="Enter RTSP URL"
        value={rtspUrl}
        onChange={(e) => setRtspUrl(e.target.value)}
      />

      <VideoPlayer rtspUrl={rtspUrl} />

      <OverlayControls addOverlay={addOverlay} />

      <div className="overlay-container">
        {overlays.map((o) => (
          <Overlay
            key={o._id}
            data={o}
            onUpdate={updateOverlay}
            onDelete={deleteOverlay}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
