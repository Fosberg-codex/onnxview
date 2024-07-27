"use client"
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { CircleX } from "lucide-react"

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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="bg-white rounded-lg w-full h-full sm:w-11/12 sm:h-5/6 md:w-10/12 md:h-4/5 lg:w-3/4 lg:h-3/4 xl:w-2/3 xl:h-2/3 max-w-6xl max-h-screen overflow-hidden flex flex-col">
            <div className="flex justify-end p-2 sm:p-3 md:p-4">
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <CircleX size={24} className="sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
              </button>
            </div>
            <div className="relative flex-grow w-full">
              <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-contain"
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