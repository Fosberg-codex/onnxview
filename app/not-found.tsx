import Image from "next/image";
import Link from "next/link";

export default function Notfound() {
    return <div className="p-5 flex justify-center items-center m-40">
        <div className="flex flex-col justify-center items-center">
            <div>
            <Image
              src='/plutoflow.png'
              alt='Youtube video'
              width={55}
              height={55}
            />
            </div>
            <div className="my-2 text-center text-sm lg:text-base md:text-base">This page is not ready</div>
            <Link href="/"><div className="text-center rounded-md bg-blue-900 text-white border border-green px-2 py-1 mt-2 cursor-pointer hover:bg-blue-900 lg:text-base md:text-base">Go back Home</div></Link>

        </div>
    </div>;
  }