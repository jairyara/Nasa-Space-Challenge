import BG from '../assets/img/bg-2.webp';
import {useIntl} from "react-intl";
import React from "react";

interface LayoutProps {
    children: React.ReactNode
}


export const Layout: React.FC<LayoutProps> = ({children}) => {

    const intl = useIntl();

    return (
        <section className='w-full h-screen grid'>
            <figure className='w-full h-screen col-start-1 row-start-1 relative'>
                <img className='w-full h-screen object-cover ' src={BG} alt="Welcome background"/>
                <figcaption className=' justify-end  absolute bottom-0 left-0 p-8 text-sm text-gray-500'>
                    {intl.formatMessage({id: 'reference'})} Freepik
                </figcaption>
            </figure>
            <section
                className='overflow-y-auto col-start-1 row-start-1 relative grid grid-cols-1 xl:grid-cols-2
                w-full h-screen bg-pickled-blue/30'>
                {children}
            </section>
        </section>
    )
}