import React from 'react';
import { Play } from 'lucide-react';
import VideoModalButton from './videoactive';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className='flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-10'>
      <div className='w-full max-w-7xl flex flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 bg-custom bg-cover mx-4 sm:mx-6 md:mx-8 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 rounded-md'>
        <h1 className='text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-2'>
          Test your Machine learning models faster than always
        </h1>
        <p className='text-white text-base sm:text-lg md:text-xl lg:text-2xl text-center'>
          Built to make you see what your model do in production
        </p>
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto'>
          <button className='p-2 text-black bg-white rounded-md font-bold hover:bg-gray-100 transition duration-300 w-full sm:w-auto text-sm sm:text-base'>
          <Link href="/modelform">Run your model for free</Link>  
          </button>
          <VideoModalButton videoSrc="/path/to/your/demo-video.mp4"> {/* Replace with your actual video path */}
            <div className='flex gap-2 items-center justify-center p-2 text-black bg-white rounded-md font-bold cursor-pointer hover:bg-gray-100 transition duration-300 w-full sm:w-auto text-sm sm:text-base'>
              <Play size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              <span>Watch Demo</span>
            </div>
          </VideoModalButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;