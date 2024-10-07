import React, {useState, useEffect} from 'react';
import BG from "../assets/img/bg-home.webp";
import {useIntl} from "react-intl";
import {useNavigate} from "react-router-dom";
import supabase from "../libs/supabaseClient.ts";
import {SwitchLang} from "../components/atoms/SwitchLang.tsx";
import {useUserStore} from "../context/globalState.ts";


enum AvatarOptions {
    option1 = 'https://ffwoelbtbgqlcrwadljw.supabase.co/storage/v1/object/sign/Avatars/avatar1.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBdmF0YXJzL2F2YXRhcjEud2VicCIsImlhdCI6MTcyODE4MzkyNiwiZXhwIjoxNzU5NzE5OTI2fQ.EYfFdyV7_KKfxKWLemAREQFfjgrkfx9tPZJDk_T9qWI&t=2024-10-06T03%3A05%3A26.668Z',
    option2 = 'https://ffwoelbtbgqlcrwadljw.supabase.co/storage/v1/object/sign/Avatars/avatar4.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBdmF0YXJzL2F2YXRhcjQud2VicCIsImlhdCI6MTcyODE4Mzk3MiwiZXhwIjoxNzU5NzE5OTcyfQ.6YNHqBx6ubFihdGfdHE2rs9uTTrE7T5aUz3UixSGdK4&t=2024-10-06T03%3A06%3A12.204Z',
    option3 = 'https://ffwoelbtbgqlcrwadljw.supabase.co/storage/v1/object/sign/Avatars/avatar3.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBdmF0YXJzL2F2YXRhcjMud2VicCIsImlhdCI6MTcyODE4Mzk1NiwiZXhwIjoxNzU5NzE5OTU2fQ.py4zleQjshZk9KzqiR6j2-PYgb_uu9ARMapWp02blBE&t=2024-10-06T03%3A05%3A57.055Z',
    option4 = 'https://ffwoelbtbgqlcrwadljw.supabase.co/storage/v1/object/sign/Avatars/avatar2.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBdmF0YXJzL2F2YXRhcjIud2VicCIsImlhdCI6MTcyODE4Mzk0MCwiZXhwIjoxNzU5NzE5OTQwfQ.CZReHg77n8kTzr87HlQB8EZwjzij7VTxKHTG_08K3Z8&t=2024-10-06T03%3A05%3A40.743Z',
}


export const Register: React.FC = () => {
    const [avatar, setAvatar] = useState<AvatarOptions | ''>(AvatarOptions.option1);
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [terms, setTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [users, setUsers] = useState<any>([]);

    const intl = useIntl();
    const navigate = useNavigate();
    const setUser = useUserStore(state => state.setUser);

    const validateForm = () => {
        if (!nick) {
            setError(intl.formatMessage({id: 'nickRequired'}));
            return false;
        }
        if (!email) {
            setError(intl.formatMessage({id: 'emailRequired'}));
            return false;
        }
        if (!terms) {
            setError(intl.formatMessage({id: 'termsRequired'}));
            return false;
        }
        return true;
    }

    const getUsers = async () => {
        try {
            // Ejecuta las dos consultas de forma paralela
            const [{ data: users, error: userError }, { data: points, error: pointsError }] = await Promise.all([
                supabase.from('Users').select('id, nick, avatar', ), // Obtenemos solo id y nick de Users
                supabase.from('Points').select('user_id, points') // Asume que el campo de puntos es total_points
            ]);

            if (userError || pointsError) {
                console.error(userError || pointsError);
                return;
            }

            // Combina los usuarios con sus puntos
            const usersWithPoints = users.map((user: any) => {
                const userPoints = points.find((point: any) => point.user_id === user.id);
                return {
                    nick: user.nick,
                    avatar: user.avatar,
                    points: userPoints?.points || 0 // Si no tiene puntos, asigna 0
                };
            });
            const sortedUsersWithPoints = usersWithPoints.sort((a: any, b: any) => b.points - a.points);
            setUsers(sortedUsersWithPoints) // Devuelve la lista combinada
        } catch (err) {
            console.error('Error fetching users with points:', err);
            return [];
        }
    }

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setError(null);
        setLoading(true);
        const {data, error} = await supabase.from('Users').insert({
            nick: nick, email: email, avatar: avatar
        })
            .select();

        if (error) {
            if (error.message.includes('duplicate key value violates unique constraint')) {
                setLoading(false);
                setError(intl.formatMessage({id: 'uniqueNickOrEmail'}));
                return;
            }
            setError(intl.formatMessage({id: 'errorToRegister'}));
            setLoading(false);
            return;
        } else {
            const userId = data[0].id;

            const {error} = await supabase.from('Points').insert({
                user_id: userId, points: 50
            })

            if (error) {
                setError(intl.formatMessage({id: 'errorToRegister'}));
                setLoading(false);
                return;
            }

            setUser(data[0]);
            setLoading(false);
            setSuccess(true);
            setNick('');
            setEmail('');
            setTerms(false);
            navigate('/instructions');
        }

    }

    const handleChooseAvatar = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAvatar(e.target.value as AvatarOptions);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <section className='w-full h-screen grid'>
            <figure className='w-full h-screen col-start-1 row-start-1 relative'>
                <img className='w-full h-screen object-cover ' src={BG} alt="Welcome background"/>
                <figcaption className=' justify-end  absolute bottom-0 left-0 p-8 text-sm text-gray-500'>
                    {intl.formatMessage({id: 'reference'})} Freepik
                </figcaption>
            </figure>
            <section
                className='col-start-1 row-start-1 relative grid grid-cols-2
                w-full h-screen '>
                <section className='bg-curious-blue/5 h-full w-full p-16 flex justify-center items-center flex-col'>
                    <SwitchLang/>
                    <form className='mt-8 flex flex-col gap-4'>

                        <h2 className='text-white text-2xl text-center font-bold'>
                            {intl.formatMessage({id: 'register'})}
                        </h2>
                        {error && <p className='text-cinnabar my-4'>{error}</p>}
                        {success && <p className='text-shamrock my-4'>
                            {intl.formatMessage({id: 'successToRegister'})}
                        </p>}
                        <label className='text-white flex flex-col gap-2'
                               htmlFor="nick">
                            <span>{intl.formatMessage({id: 'nick'})}</span>
                            <input id='nick' type="text"
                                   value={nick}
                                   onChange={(e) => setNick(e.target.value)}
                                   placeholder={intl.formatMessage({id: 'urBestNick'})}
                                   className='w-full h-10 rounded px-4 text-pickled-blue'/>
                        </label>
                        <label className='text-white flex flex-col gap-2'
                               htmlFor="email">
                            <span>{intl.formatMessage({id: 'email'})}</span>
                            <input id='email' type="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   placeholder={intl.formatMessage({id: 'urBestEmail'})}
                                   className='w-full h-10 rounded px-4 text-pickled-blue'/>
                        </label>
                        <section>
                            <label className='text-white flex flex-col gap-2 mb-4'
                                   htmlFor="avatar">
                                <span>{intl.formatMessage({id: 'setAvatar'})}</span>
                                <select onChange={handleChooseAvatar} value={avatar} id='avatar'
                                        className='w-full h-10 rounded px-4 text-pickled-blue'>
                                    <option
                                        value={AvatarOptions.option1}>{intl.formatMessage({id: 'nameAvatar1'})}</option>
                                    <option
                                        value={AvatarOptions.option2}>{intl.formatMessage({id: 'nameAvatar2'})}</option>
                                    <option
                                        value={AvatarOptions.option3}>{intl.formatMessage({id: 'nameAvatar3'})}</option>
                                    <option
                                        value={AvatarOptions.option4}>{intl.formatMessage({id: 'nameAvatar4'})}</option>
                                </select>
                            </label>
                            <section className='flex justify-between items-center'>
                                <img
                                    className={`aspect-square w-24 rounded-full object-cover object-top  transition-opacity ease-in duration-500 ${avatar === AvatarOptions.option1 ? 'opacity-100' : 'opacity-50'}`}
                                    src={AvatarOptions.option1} alt='Avatar'/>
                                <img
                                    className={`aspect-square w-24 rounded-full object-cover object-top transition-opacity ease-in duration-500 ${avatar === AvatarOptions.option2 ? 'opacity-100' : 'opacity-50'}`}
                                    src={AvatarOptions.option2} alt='Avatar'/>
                                <img
                                    className={`aspect-square w-24 rounded-full object-cover object-top transition-opacity ease-in duration-500 ${avatar === AvatarOptions.option3 ? 'opacity-100' : 'opacity-50'}`}
                                    src={AvatarOptions.option3} alt='Avatar'/>
                                <img
                                    className={`aspect-square w-24 rounded-full object-cover object-top transition-opacity ease-in duration-500 ${avatar === AvatarOptions.option4 ? 'opacity-100' : 'opacity-50'}`}
                                    src={AvatarOptions.option4} alt='Avatar'/>
                            </section>
                            <p className='text-gray-200 pt-3'>
                                {avatar === AvatarOptions.option1 && intl.formatMessage({id: 'descAvatar1'})}
                                {avatar === AvatarOptions.option2 && intl.formatMessage({id: 'descAvatar2'})}
                                {avatar === AvatarOptions.option3 && intl.formatMessage({id: 'descAvatar3'})}
                                {avatar === AvatarOptions.option4 && intl.formatMessage({id: 'descAvatar4'})}
                            </p>
                        </section>
                        <label className='text-white flex items-center gap-2 accent-shamrock'
                               htmlFor="terms">
                            <input
                                onChange={(e) => setTerms(e.target.checked)}
                                checked={terms}
                                id='terms'
                                type="checkbox" className='w-4 h-4'/>
                            <span>{intl.formatMessage({id: 'treatData'})}</span>
                        </label>
                        <button disabled={loading} onClick={handleRegister}
                                className={`bg-shamrock text-white rounded px-4 py-2 ${loading && 'opacity-50'}`}>
                            {intl.formatMessage({id: 'register'})}
                        </button>

                    </form>
                </section>
                <section
                    className='h-screen overflow-y-scroll p-10 w-full bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 '>
                    <h2 className='text-white font-bold text-center text-4xl mb-10'>
                        {intl.formatMessage({id: 'scoreBoard'})}
                    </h2>
                    <table className='text-white w-full border-collapse border border-gray-50'>
                        <thead>
                        <tr className='bg-curious-blue'>
                            <th className='border border-gray-50 text-center py-4 font-bold text-lg'>
                                {intl.formatMessage({id: 'position'})}
                            </th>
                            <th className='border border-gray-50 text-center py-4 font-bold text-lg'>
                                {intl.formatMessage({id: 'user'})}
                            </th>
                            <th className='border border-gray-50 text-center py-4 font-bold text-lg'>
                                {intl.formatMessage({id: 'score'})}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map((user: any, index: number) => (
                                <tr key={user.id}
                                    >
                                    <td className='border border-gray-50 text-center'>
                                        {index + 1}
                                    </td>
                                    <td className='flex items-center gap-2 border border-gray-50 px-8 py-2'>
                                        <img className='aspect-square w-10 rounded-full' src={user.avatar} alt='User'/>
                                        {user.nick}
                                    </td>

                                    <td className='border border-gray-50 text-center text-white'>
                                        {user.points}
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </section>
            </section>
        </section>
    )
}