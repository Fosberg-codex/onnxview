import * as React from 'react';

interface EmailTemplateProps {
  text: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  text,
}) => (
  <div className='flex flex-col gap-2 items-start justify-center'>
    <div className='text-lg font-bold text-lime-500'>Hello From Pluoflow team!</div>
    <div className='text-md text-blue-500'> {text}
    </div>
  </div>
);