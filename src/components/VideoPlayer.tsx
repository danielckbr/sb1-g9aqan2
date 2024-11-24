import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface VideoPlayerProps {
  src: string;
  isActive: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && inView) {
        videoRef.current.play().catch(() => {
          // Handle autoplay failure
          console.log('Autoplay prevented');
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, inView]);

  return (
    <div ref={ref} className="relative w-full h-full bg-black">
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        playsInline
        muted
        controls={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
    </div>
  );
};