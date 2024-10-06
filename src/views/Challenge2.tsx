import React, {useEffect, useState} from 'react';
import {useIntl} from "react-intl";
import {Layout} from "../layouts/Layout.tsx";
import {Header} from "../components/molecules/Header.tsx";
import supabase from "../libs/supabaseClient.ts";
import {useUserStore, usePointsStore} from "../context/globalState.ts";
import {useNavigate} from "react-router-dom";

interface Question {
    question: string;
    answer: string;
    options: string[];
}

const questions: Question[] = [
    {
        question: '¿Año con más emisiones de C02?',
        answer: '2019',
        options: ['2007', '2012', '2017', '2019']
    },
    {
        question: '¿Qué años han estado debajo de las 7000 toneladas de emisión?',
        answer: '2000 y 2001',
        options: ['2009 y 2020', '2000 y 2001', '2010 y 2012', '2020']
    },
    {
        question: '¿La pandemia detuvo el crecimiento de emisiones?',
        answer: 'Disminuyó las emisiones',
        options: ['Disminuyó las emisiones', 'Aumentó', 'Se mantuvo igual', 'No sabe']
    },
]

export const Challenge2: React.FC = () => {

    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const intl = useIntl();

    const navigate = useNavigate();

    const {user} = useUserStore();
    const {points} = usePointsStore();
    const setPoints = usePointsStore(state => state.setPoints);

    const asignPointsStartChallenge = async () => {

        const {error} = await supabase.from('Points').update({
            points: points + 20
        }).eq('user_id', user.id).single();
        setPoints(points + 20);
        if (error) {
            console.error('Error inserting points:', error.message);
            return;
        }
    }

    const putPoints = async (won:number) => {
        const {error} = await supabase.from('Points').update({
            points: points + (won *20)
        }).eq('user_id', user.id).single();
        setPoints(points + (won * 20));
        if (error) {
            console.error('Error inserting points:', error.message);
            return;
        }
    }

    const handleOptionChange = (questionIndex: number, option: string) => {
        setSelectedOptions((prevSelectedOptions:any) => ({
            ...prevSelectedOptions,
            [questionIndex]: option,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        putPoints(getScore());
    };

    const getScore = () => {
        let score = 0;
        questions.forEach((q, index) => {
            if (selectedOptions[index] === q.answer) {
                score += 1;
            }
        });
        return score;
    };

    const skipChallenge = () => {
        navigate('/co2-global-2');
    }

    useEffect(() => {
        asignPointsStartChallenge();
    }, [])

    return (
        <Layout>
            <section className='bg-curious-blue/5 h-screen w-full flex items-center flex-col'>
                <Header/>
                <section className='p-8'>
                    <article className='bg-white p-4 w-full rounded'>
                        <h1 className='text-4xl text-center font-bold'>
                            {intl.formatMessage({id: 'carbonFootprint'})}
                        </h1>
                        <p className='text-sm text-gray-400'>
                            {intl.formatMessage({id: 'globalEmissions21Century'})}
                        </p>
                        <cite className='text-xs text-gray-400'>
                            {intl.formatMessage({id: 'dataSources'})} Carbon Monitor ORG
                        </cite>
                    </article>
                    <section className='p-4'>
                        <h3 className='text-white font-bold mb-4'>
                            {intl.formatMessage({id: 'title1'})}
                        </h3>
                        <p className='text-white text-sm'>
                            {intl.formatMessage({id: 'story1'})}
                        </p>
                    </section>
                </section>
            </section>
            <section
                className='h-screen overflow-y-scroll p-10 w-full bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 '>
                <form onSubmit={handleSubmit}>
                    <h2 className='text-white text-center font-bold text-xl'>{intl.formatMessage({id: 'challenge2'})}</h2>
                    {questions.map((q, questionIndex) => (
                        <div key={questionIndex}>
                            <h3 className='text-white mb-4 mt-4'>{q.question}</h3>
                            {q.options.map((option) => (
                                <div key={option}>
                                    <label className='text-white'>
                                        <input
                                            className='accent-shamrock mr-2'
                                            type="radio"
                                            name={`question-${questionIndex}`}
                                            value={option}
                                            checked={selectedOptions[questionIndex] === option}
                                            onChange={() => handleOptionChange(questionIndex, option)}
                                        />
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}

                    <button className='px-4 py-2 h-10 bg-shamrock text-white rounded mt-4'
                            type="submit">{intl.formatMessage({id: 'save'})}</button>

                    {isSubmitted && (
                        <div>
                            <p className='text-white'>Has respondido
                                correctamente {getScore()} de {questions.length} preguntas.</p>
                            <button className='bg-shamrock text-white px-4 ml-4 py-2 rounded'>
                                {intl.formatMessage({id: 'continueAdventure'})}
                            </button>
                        </div>
                    )}
                </form>
                <button onClick={skipChallenge} className='bg-cinnabar text-white px-4 mt-4 py-2 rounded'>
                    {intl.formatMessage({id: 'skipChallenge'})}
                </button>
            </section>
        </Layout>
    )
}