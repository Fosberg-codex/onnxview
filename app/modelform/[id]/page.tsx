import React from 'react'
import Nav from '@/app/landcomp/nav'
import Prediction from '@/app/components/prediction';
import Banner from '@/app/landcomp/banner';


async function getFormDetails(id: string) {
    try{
        const res = await fetch(`http://localhost:3001/api/createform/${id}`, { cache: 'no-cache' });
        if (!res.ok) throw new Error('Failed to fetch form details');
        const data = await res.json();
        console.log(data)
        return data
    } catch(err:any){
        console.log(err)
    }
    
  }

const page = async({ params }: { params: { id: string } }) => {

    const form = await getFormDetails(params.id);
    console.log(form.name)

  return (
    <>
    <Banner/>
    <Nav/>
    <div className='mt-12 mx-6 flex justify-center'>
    <div className=' w-8/12 flex flex-col justify-center items-center mt-4'>
       <div className='text-xl font-semibold'>Model title: {form.name}</div>
       <div className='self-start font-semibold text-lg mt-2'>Description</div>
       <div className='self-start '>{form.description}</div>
       <div className='flex gap-6 self-start mt-4'>
        <div className='text-lg px-2 py-1 bg-orange-500 text-white rounded-sm'>{form.framework}</div>
        <div> <span className='font-semibold text-lg'>Number of independent features </span>: {form.numberOfFeatures}</div>
       </div>
       <div className='self-start w-full'>
       <Prediction formId={form._id} featureNames={form.featureNames} />
       </div>
       
       
       
     

    </div>
      
    </div>
    </>
  )
}

export default page
