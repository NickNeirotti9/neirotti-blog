import React, { useState, useEffect, useRef } from "react";
import styles from "../assets/home.module.css";

interface ToggleVideoTranscriptProps {
  videoId: string;
  transcript: JSX.Element;
}

const ToggleVideoTranscript: React.FC<ToggleVideoTranscriptProps> = ({
  videoId,
  transcript,
}) => {
  const [showVideo, setShowVideo] = useState(true);
  const [videoHeight, setVideoHeight] = useState("0px"); // State to store video height
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (videoContainerRef.current) {
        const width = videoContainerRef.current.offsetWidth;
        const height = (width * 9) / 16; // Calculate the height based on a 16:9 aspect ratio
        setVideoHeight(`${height}px`); // Set the calculated height
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDisplay = () => setShowVideo(!showVideo);

  return (
    <div>
      {showVideo ? (
        <div
          ref={videoContainerRef}
          className={styles.videoContainer}
          style={{ height: videoHeight }}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        // Apply the same dynamic height to the transcript box
        <div className={styles.transcript} style={{ height: videoHeight }}>
          {transcript}
        </div>
      )}
      <button className={styles.buttonBelow} onClick={toggleDisplay}>
        {showVideo ? "Show Transcript" : "Show Video"}
      </button>
    </div>
  );
};

export default ToggleVideoTranscript;
