import BG from "../assets/img/bg-1.webp";
import {useIntl} from "react-intl";
import {Header} from "../components/molecules/Header.tsx";
import {ButtonDefault} from "../components/atoms/ButtonDefault.tsx";
import {useNavigate} from "react-router-dom";

export const Instructions = () => {

    const intl = useIntl();
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/co2-global');
    }

    return (
        <section className='w-full h-screen grid'>
            <figure className='w-full h-screen col-start-1 row-start-1 relative'>
                <img className='w-full h-screen object-cover ' src={BG} alt="Welcome background"/>
                <figcaption className=' justify-end absolute bottom-0 right-0 p-8 text-sm text-gray-500'>
                    {intl.formatMessage({id: 'reference'})} Freepik
                </figcaption>
            </figure>
            <article
                className='col-start-1 row-start-1 relative w-full h-screen overflow-y-auto py-4 md:py-0 flex flex-col gap-4  items-center bg-pickled-blue/60'>
                <Header/>
                <section className='mt-4 w-4/5 mx-auto'>
                    <h1 className='text-4xl text-white font-bold text-center'>
                        {intl.formatMessage({id: 'title'})}
                    </h1>
                    <h2 className='text-2xl text-white font-semibold mt-2 text-center'>
                        {intl.formatMessage({id: 'subtitle'})}
                    </h2>
                    <p className='text-white text-center mt-4'>
                        {intl.formatMessage({id: 'textIntroduction'})}
                    </p>
                    <section className='flex gap-3 md:gap-0 mt-4 justify-around'>
                        <article
                            className='w-72 p-4 bg-white bg-clip-padding backdrop-filter rounded backdrop-blur-sm bg-opacity-10'>
                            <h3 className='text-white text-xl font-semibold mt-4'>
                                {intl.formatMessage({id: 'carbonFootprint'})}
                            </h3>
                            <p className='text-white mt-4'>
                                {intl.formatMessage({id: 'carbonFootprintText'})}
                            </p>
                        </article>

                        <article
                            className='w-72 p-4 bg-white bg-clip-padding backdrop-filter rounded backdrop-blur-sm bg-opacity-10'>
                            <h3 className='text-white text-xl font-semibold mt-4'>
                                {intl.formatMessage({id: 'globalThermometer'})}
                            </h3>
                            <p className='text-white mt-4'>
                                {intl.formatMessage({id: 'globalThermometerText'})}
                            </p>
                        </article>

                    </section>
                    <p className='mt-4 text-white text-center'>
                        {intl.formatMessage({id: 'motivationMessage'})}
                    </p>
                    <p className='mt-4 text-white text-center'>
                        {intl.formatMessage({id: 'readyToHelp'})}
                    </p>
                </section>
                <ButtonDefault title={intl.formatMessage({id: 'startChallenge'})} func={handleNavigate}/>
            </article>
        </section>
    )
}