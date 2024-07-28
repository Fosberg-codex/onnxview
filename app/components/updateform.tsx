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
    framework: string;
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="numberOfFeatures" className="block text-sm font-medium text-gray-700 mb-1">Number of Features:</label>
          <input
            type="number"
            id="numberOfFeatures"
            name="numberOfFeatures"
            value={formData.numberOfFeatures}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="featureNames" className="block text-sm font-medium text-gray-700 mb-1">Feature Names (comma-separated):</label>
          <input
            type="text"
            id="featureNames"
            name="featureNames"
            value={formData.featureNames.join(',')}
            onChange={handleFeatureNamesChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="onnxFile" className="block text-sm font-medium text-gray-700 mb-1">ONNX File:</label>
          <input
            type="file"
            id="onnxFile"
            name="onnxFile"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div>
          <label htmlFor="framework" className="block text-sm font-medium text-gray-700 mb-1">Framework:</label>
          <input
            type="text"
            id="framework"
            name="framework"
            value={formData.framework}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4'>
        <button className="w-full sm:w-auto bg-pink-400 text-white px-6 py-2 rounded-md hover:bg-pink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Update
        </button>
        <Link href={`/modelform/${formId}`}>
          <div className='w-full sm:w-auto text-center underline text-red-500 bg-black px-4 py-2 rounded-md hover:bg-gray-800 transition-colors'>Cancel</div>
        </Link>
      </div>
    </form>
  );
}