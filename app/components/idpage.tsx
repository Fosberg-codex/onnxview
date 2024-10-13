"use client"
import React, { useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Nav from '@/app/landcomp/nav2'
import Prediction from '@/app/components/prediction';
import Banner from '@/app/landcomp/banner';

const ClientPage = ({ form }: any) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter()

  useEffect(() => {
    if (sessionStatus !== "authenticated") {
      router.replace("/auth/signin");
    }
  }, [sessionStatus, router]);

  return (
    <>
      <Banner />
      <Nav />
      
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center'>
            {form.name}
          </h1>
          <div className='bg-white border border-gray-200 rounded-md p-6 mb-8'>
            <h2 className='text-xl font-semibold mb-2'>Description</h2>
            <p className='text-gray-700 mb-4'>{form.description}</p>
            <div className='flex flex-wrap gap-4 items-center mb-4'>
              <span className='px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-medium'>
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

export default ClientPage