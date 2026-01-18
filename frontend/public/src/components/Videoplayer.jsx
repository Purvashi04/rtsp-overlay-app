const VideoPlayer = ({ rtspUrl }) => {
  return (
    <div className="video-box">
      {rtspUrl ? (
        <video controls autoPlay width="700">
          <source src={rtspUrl} />
        </video>
      ) : (
        <p style={{ color: "red" }}>Enter RTSP URL to start streaming</p>
      )}
    </div>
  );
};

export default VideoPlayer;
