"use client"
import React from 'react'
import { useState } from 'react';
//export const //runtime = "edge"; 
import { Plus } from 'react-feather';

const Faqs = () => {

    const  items=[
        { title: 'Why Plutoflow?', content: 'Plutoflow is a no-code platform that is on the mission to help you test and run your machine learning models in production' },
        { title: 'Is this the best platform for me', content: 'Plutoflow is for all data professionals namely Data Scientits, Machine Learning Engineers, Software Engineers and MLOps Engineers' },
        { title: 'Is it the process easy', content: 'The process is super easy. As you build your model just convert it to .onnx file and start testing your model here. Check out our Docs page to get the hack' },
        // Add more items as needed
      ]

      
        const [activeIndex, setActiveIndex] = useState(null);
      
        const toggleAccordion = (index:any) => {
          setActiveIndex(index === activeIndex ? null : index);
        }

  return (
    <div className='bg-blue-50 px-0 lg:px-2 md:px-2 pt-2 pb-6'>
      <div className="flex flex-col gap-2 justify-center items-center w-full py-8">
                            <div className='lg:text-3xl md:text-xl text-md    text-blackt lg:text-blackt md:text-blackt pt-4 pb-2'>Frequently Asked questions</div>
                    {items.map((item, index) => (
                        <div key={index} className="bg-white text-blackt lg:text-blackt md:text-blackt border border-green text-sm md:text-md lg:text-md p-2 rounded-md w-3/4">
                            
                        <div
                            className="accordion-header cursor-pointer flex justify-between items-center p-4  border-gray-300 focus:outline-none"
                            onClick={() => toggleAccordion(index)}
                        >

                        
                            <div className='font-semibold'>{item.title}</div>
                           
                                  <Plus
                                  className={`w-4 h-4 z-10 transition-transform transform ${
                                    index === activeIndex ? 'rotate-180' : ''
                                  } z-10`}
                                />
                            
                        </div>
                        
                        {index === activeIndex && (
                            <div className="accordion-content p-4 border-t border-gray-300">
                            {item.content}
                            </div>
                        )}
                        </div>
                    ))}
                    </div>
    </div>
  )
}

export default Faqs
