import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UpdateFormProps {
  formId: string;
  initialData: {
    name: string;
    numberOfFeatures: number;
    featureNames: string[];
    description: string;
  };
}

export default function UpdateForm({ formId, initialData }: UpdateFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureNamesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, featureNames: e.target.value.split(',') }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        data.append(key, value.join(','));
      } else {
        data.append(key, value.toString());
      }
    });
    if (file) {
      data.append('onnxFile', file);
    }

    try {
      const response = await fetch(`/api/createform/${formId}`, {
        method: 'PATCH',
        body: data,
      });

      if (response.ok) {
        alert('Form updated successfully');
        router.push(`/modelform/${formId}`);
      } else {
        alert('Failed to update form');
      }
    } catch (error) {
      console.error('Error updating form:', error);
      alert('An error occurred while updating the form');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border border-black  rounded"
        />
      </div>
      <div>
        <label htmlFor="numberOfFeatures" className="block mb-1">Number of Features:</label>
        <input
          type="number"
          id="numberOfFeatures"
          name="numberOfFeatures"
          value={formData.numberOfFeatures}
          onChange={handleInputChange}
          className="w-full p-2 border border-black  rounded"
        />
      </div>
      <div>
        <label htmlFor="featureNames" className="block mb-1">Feature Names (comma-separated):</label>
        <input
          type="text"
          id="featureNames"
          name="featureNames"
          value={formData.featureNames.join(',')}
          onChange={handleFeatureNamesChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="onnxFile" className="block mb-1">ONNX File:</label>
        <input
          type="file"
          id="onnxFile"
          name="onnxFile"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block mb-1">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 border border-black  rounded"
        />
      </div>
      <div className='flex justify-between'>
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        update
      </button>
      <Link href={`/modelform/${formId}`}><div className='underline text-red-500 bg-black px-2 py-1 rounded-md'>Cancel</div></Link>
      </div>
    </form>
  );
}