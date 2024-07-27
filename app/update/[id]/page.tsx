"use client"
import React from 'react'
import Nav from '@/app/landcomp/nav'
import UpdateForm from '@/app/components/updateform';

async function getFormDetails(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/createform/${id}`, { cache: 'no-cache' });
    if (!res.ok) throw new Error('Failed to fetch form details');
    return await res.json();
  } catch (err: any) {
    console.error('Error fetching form details:', err);
    return null;
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const form = await getFormDetails(params.id);

  if (!form) {
    return (
      <>
        <Nav />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Error</p>
            <p>Failed to load form details. Please try again later.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12'>
        <div className='max-w-3xl mx-auto'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-6 text-center'>Update Model Form</h1>
          <div className='bg-white shadow-md rounded-lg p-4 sm:p-6 lg:p-8'>
            <UpdateForm
              formId={params.id}
              initialData={{
                name: form.name,
                numberOfFeatures: form.numberOfFeatures,
                featureNames: form.featureNames,
                description: form.description,
                framework: form.framework,
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page