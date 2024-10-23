import React from 'react'
import ClientPage from '@/app/components/idpage'

async function getFormDetails(id: string) {
  try {
    const res = await fetch(`https://plutofloww.com/api/createform/${id}`, { cache: 'no-cache' });
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

  return <ClientPage form={form} />;
}

export default Page