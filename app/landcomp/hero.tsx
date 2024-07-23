import React from 'react';
import { Play } from 'lucide-react';
import VideoModalButton from './videoactive';

const Hero = () => {
  return (
    <div className='flex justify-center mt-4'>
      <div className='w-full flex flex-col items-center gap-6 bg-custom bg-cover mx-8 py-24 px-16 rounded-md'>
        <div className='text-white text-4xl sm:text-5xl md:text-6xl font-bold text-center mt-2'>
          Test your Machine learning models faster than always
        </div>
        <div className='text-white text-xl sm:text-2xl text-center'>
          Built to make you see what your model do in production
        </div>
        <div className='flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto'>
          <button className='p-2 text-black bg-white rounded-md font-bold hover:bg-gray-100 transition duration-300 w-full sm:w-auto'>
            Test your model for free
          </button>
          <VideoModalButton videoSrc="/path/to/your/demo-video.mp4"> {/* Replace with your actual video path */}
            <div className='flex gap-2 items-center justify-center p-2 text-black bg-white rounded-md font-bold cursor-pointer hover:bg-gray-100 transition duration-300 w-full sm:w-auto'>
              <Play size={24} />
              <span>Watch Demo</span>
            </div>
          </VideoModalButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;