import React from 'react';

interface ButtonDefaultProps {
    title: string;
    func: () => void;
}


export const ButtonDefault: React.FC<ButtonDefaultProps> = ({title, func}) => {
    return (
        <button className='bg-shamrock text-white rounded px-4 py-2'
            onClick={func}>
            {title}
        </button>
    )
}