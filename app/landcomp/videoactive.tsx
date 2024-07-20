"use client"
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import {CircleX} from "lucide-react"

interface VideoModalButtonProps {
  videoSrc: string;
  children: ReactNode;
}

const VideoModalButton: React.FC<VideoModalButtonProps> = ({ videoSrc, children }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => {
    setIsModalOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  return (
    <>
      <button onClick={openModal} className="w-full sm:w-auto">
        {children}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg pb-16 px-8 pt-4 w-full h-full max-w-none max-h-none">
          <div className="flex justify-end mb-2">
            <button onClick={closeModal}>
              <CircleX size={30} />
            </button>
          </div>
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full rounded-md"
              controls
              autoPlay
              src={videoSrc}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      
      
      )}
    </>
  );
};

export default VideoModalButton;