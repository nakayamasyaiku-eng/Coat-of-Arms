"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  const attemptedAutoplay = useRef(false);
  const [needsSoundPermission, setNeedsSoundPermission] = useState(false);

  const playWithSound = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;

    try {
      await video.play();
      setNeedsSoundPermission(false);
    } catch {
      // Audible autoplay is often browser-blocked. Keep the film moving and
      // request the single user gesture needed to restore its soundtrack.
      video.muted = true;
      await video.play().catch(() => undefined);
      setNeedsSoundPermission(true);
    }
  }, []);

  useEffect(() => {
    if (attemptedAutoplay.current) return;
    attemptedAutoplay.current = true;
    void playWithSound();
  }, [playWithSound]);

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
        onCanPlay={() => {
          if (!attemptedAutoplay.current) {
            attemptedAutoplay.current = true;
            void playWithSound();
          }
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      {needsSoundPermission ? (
        <button
          className="enable-video-sound"
          type="button"
          onClick={() => void playWithSound()}
        >
          <span aria-hidden="true">♪</span>
          {enableSoundLabel}
        </button>
      ) : null}
    </div>
  );
}
