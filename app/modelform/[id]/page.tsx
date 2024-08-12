import React from 'react'
import Nav from '@/app/landcomp/nav'
import Prediction from '@/app/components/prediction';
import Banner from '@/app/landcomp/banner';

async function getFormDetails(id: string) {
  try {
    const res = await fetch(`https://plutofloww.vercel.app/api/createform/${id}`, { cache: 'no-cache' });
    if (!res.ok) throw new Error('Failed to fetch form details');
    return await res.json();
  } catch (err: any) {
    console.error(err);
    return null;
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const form = await getFormDetails(params.id);

  if (!form) {
    return <div>Error loading form details</div>;
  }

  return (
    <>
      
      <Nav />
      <Banner />
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center'>
            {form.name}
          </h1>
          <div className='bg-white border border-gray-200 rounded-md p-6 mb-8'>
            <h2 className='text-xl font-semibold mb-2'>Description</h2>
            <p className='text-gray-700 mb-4'>{form.description}</p>
            <div className='flex flex-wrap gap-4 items-center mb-4'>
              <span className='px-3 py-1 bg-orange-500 text-white rounded-md text-sm font-medium'>
                {form.framework}
              </span>
              <span className='text-gray-700'>
                <strong>Number of independent features:</strong> {form.numberOfFeatures}
              </span>
            </div>
          </div>
          <div className='bg-white border border-gray-200  rounded-md p-6'>
            <Prediction formId={form._id} featureNames={form.featureNames} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page