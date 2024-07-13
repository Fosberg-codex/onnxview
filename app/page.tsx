import CreateModelForm from "./components/CreateModelForm"

export default function CreateModel() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Model</h1>
      <CreateModelForm />
    </div>
  )
}





















// "use client"
// import Image from "next/image";
// import { useState } from "react";

// export default function Home() {


//   const [modelName, setModelName] = useState('');
//   const [numberOfFeatures, setNumberOfFeatures] = useState('');
//   const [featureNames, setFeatureNames] = useState('');
//   const [onnxFile, setOnnxFile] = useState<null | any>(null);
//   const [typeCase, setTypeCase] = useState('');
//   const [framework, setFramework] = useState('');
//   const [modelDescription, setModelDescription] = useState('');

//   const handleSubmit = async (event:any) => {
//     event.preventDefault();

//     const formData = {
//       modelName,
//       numberOfFeatures,
//       featureNames,
//       typeCase,
//       framework,
//       modelDescription
//     };

//     console.log('Form Data:', formData);

//     const fileData = new FormData();
//     fileData.append('onnxFile', onnxFile);

//     try {
//       const response = await fetch('/your-endpoint', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       // Handle file separately
//       const fileResponse = await fetch('/your-file-endpoint', {
//         method: 'POST',
//         body: fileData
//       });

//       const data = await response.json();
//       const fileResponseData = await fileResponse.json();
//       console.log('Response Data:', data);
//       console.log('File Response Data:', fileResponseData);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <>
//     <div>
//       <div className="flex justify-center gap-8 mt-8 text-semibold">
//       <div>OnnixOffice</div>
//       <div>View models</div>
//       <div>About</div>
//       </div>
//       <div className="mt-12 text-2xl font-bold flex justify-center text-violet-700">Model submission form</div>

//       {/* form */}
      
//       <div className="flex justify-center">
//       <form className="mt-8 space-y-6 w-10/12" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="model-name" className="sr-only">
//                 Model Name
//               </label>
//               <input
//                 id="model-name"
//                 name="modelName"
//                 type="text"
//                 required
//                 value={modelName}
//                 onChange={(e) => setModelName(e.target.value)}
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Model Name"
//               />
//             </div>
//             <div>
//               <label htmlFor="number-of-features" className="sr-only">
//                 Number of Features
//               </label>
//               <input
//                 id="number-of-features"
//                 name="numberOfFeatures"
//                 type="number"
//                 required
//                 value={numberOfFeatures}
//                 onChange={(e) => setNumberOfFeatures(e.target.value)}
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Number of Features"
//               />
//             </div>
//             <div>
//               <label htmlFor="feature-names" className="sr-only">
//                 Feature Names
//               </label>
//               <input
//                 id="feature-names"
//                 name="featureNames"
//                 type="text"
//                 required
//                 value={featureNames}
//                 onChange={(e) => setFeatureNames(e.target.value)}
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Feature Names (comma-separated)"
//               />
//             </div>
//             <div>
//               <label htmlFor="onnx-file" className="sr-only">
//                 ONNX File
//               </label>
//               <input
//                 id="onnx-file"
//                 name="onnxFile"
//                 type="file"
//                 accept=".onnx"
//                 required
//                 onChange={(e:any) => setOnnxFile(e.target.files[0])}
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//               />
//             </div>
//             <div className="flex items-center justify-start gap-4 py-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Type Case
//               </label>
//               <div className="flex items-center">
//                 <input
//                   id="tabular"
//                   name="typeCase"
//                   type="radio"
//                   value="Tabular"
//                   required
//                   checked={typeCase === 'Tabular'}
//                   onChange={() => setTypeCase('Tabular')}
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
//                 />
//                 <label htmlFor="tabular" className="ml-3 block text-sm font-medium text-gray-700">
//                   Tabular
//                 </label>
//               </div>
//               <div className="flex items-center ml-6">
//                 <input
//                   id="image"
//                   name="typeCase"
//                   type="radio"
//                   value="Image"
//                   required
//                   checked={typeCase === 'Image'}
//                   onChange={() => setTypeCase('Image')}
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
//                 />
//                 <label htmlFor="image" className="ml-3 block text-sm font-medium text-gray-700">
//                   Image
//                 </label>
//               </div>
//             </div>
//             <div>
//               <label htmlFor="framework" className="sr-only">
//                 Framework
//               </label>
//               <input
//                 id="framework"
//                 name="framework"
//                 type="text"
//                 required
//                 value={framework}
//                 onChange={(e) => setFramework(e.target.value)}
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Framework"
//               />
//             </div>
//             <div>
//               <label htmlFor="model-description" className="sr-only">
//                 Model Description
//               </label>
//               <input
//                 id="model-description"
//                 name="modelDescription"
//                 type="text"
//                 required
//                 value={modelDescription}
//                 onChange={(e) => setModelDescription(e.target.value)}
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Model Description"
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Submit
//             </button>
//           </div>
//         </form>

//         </div>
      
//     </div>
//     </>
//   );
// }
