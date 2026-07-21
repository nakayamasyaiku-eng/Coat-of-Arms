"use client";

import { useCallback, useRef, useState } from "react";

type AutoplayVideoProps = {
  src: string;
  poster: string;
  enableSoundLabel: string;
};

export function AutoplayVideo({
  src,
  poster,
  enableSoundLabel,
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const startedPlayback = useRef(false);
  const [needsSoundPermission, setNeedsSoundPermission] = useState(false);

  const enableSound = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;

    try {
      await video.play();
      startedPlayback.current = true;
      setNeedsSoundPermission(false);
    } catch {
      setNeedsSoundPermission(true);
    }
  }, []);

  const tryAutoplay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || startedPlayback.current) return;

    video.muted = false;
    video.volume = 1;

    try {
      await video.play();
      startedPlayback.current = true;
      setNeedsSoundPermission(false);
    } catch {
      // Browsers commonly block audible autoplay. Retry muted so the film
      // still starts, then expose the one-click soundtrack control.
      video.muted = true;
      try {
        await video.play();
        startedPlayback.current = true;
      } catch {
        return;
      }
      setNeedsSoundPermission(true);
    }
  }, []);

  return (
    <div className="autoplay-video-shell">
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        controls
        preload="auto"
        poster={poster}
        onCanPlay={() => void tryAutoplay()}
      >
        <source src={src} type="video/mp4" />
      </video>
      {needsSoundPermission ? (
        <button
          className="enable-video-sound"
          type="button"
          onClick={() => void enableSound()}
        >
          <span aria-hidden="true">♪</span>
          {enableSoundLabel}
        </button>
      ) : null}
    </div>
  );
}
