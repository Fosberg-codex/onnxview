import Image from "next/image";

export default function Loading() {
    return <div className="p-5 flex justify-center items-center m-40">
        <div className="flex flex-col justify-center items-center">
           
            <div className="w-12 h-12 border-t-4 border-green border-solid p-2 border-black rounded-full animate-spin">
           <Image
            src='/plutoflow.png'
            alt='Youtube video a'
            width={55}
            height={55}
          /> 
            </div>
            {/* <div className="text-center">Loading please wait....</div> */}

        </div>
    </div>;
  }