"use client"
import React from 'react'
import Nav from '@/app/landcomp/nav'
import UpdateForm from '@/app/components/updateform';


async function getFormDetails(id: string) {
    try{
        const res = await fetch(`http://localhost:3000/api/createform/${id}`, { cache: 'no-cache' });
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
    <Nav/>
    <div className='mt-12 mx-6 flex justify-center'>
    <div className=' w-8/12 flex flex-col justify-center items-center mt-4'>
       <div className='self-start w-full'>
       <UpdateForm
        formId={params.id}
        initialData={{
          name: form.name,
          numberOfFeatures: form.numberOfFeatures,
          featureNames: form.featureNames,
          description: form.description,
        }}
      />
       </div>
       
       
       
     

    </div>
      
    </div>
    </>
  )
}

export default page
