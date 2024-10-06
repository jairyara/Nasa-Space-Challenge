import React from 'react';
import BG from '../assets/img/bg-home-2.webp';
import {useIntl} from "react-intl";
import {useNavigate} from "react-router-dom";
import {SwitchLang} from "../components/atoms/SwitchLang.tsx";
import {ButtonDefault} from "../components/atoms/ButtonDefault.tsx";


export const Welcome:React.FC = () => {
    const intl = useIntl();

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/register');
    }

    return (
        <section className='w-full h-screen grid'>
            <figure className='w-full h-screen col-start-1 row-start-1 relative'>
                <img className='w-full h-screen object-cover ' src={BG} alt="Welcome background" />
                <figcaption className=' justify-end text-white absolute bottom-0 right-0 p-8 text-sm text-gray-500'>
                    {intl.formatMessage({id: 'reference'})} Freepik
                </figcaption>
            </figure>
            <article className='col-start-1 row-start-1 relative w-full h-screen flex flex-col gap-4 justify-center items-center bg-pickled-blue/30'>
                <SwitchLang />
                <h1 className='text-4xl text-white'>
                    {intl.formatMessage({id: 'welcome'})}
                </h1>
                <ButtonDefault title={intl.formatMessage({id: 'startStory'})}
                               func={handleClick} />
            </article>
        </section>
    )
}