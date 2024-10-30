import React, {useState, useEffect} from "react";
import {Layout} from "../layouts/Layout.tsx";
import {Header} from "../components/molecules/Header.tsx";
import {useIntl} from "react-intl";
import supabase from "../libs/supabaseClient.ts";
import {usePointsStore, useUserStore} from "../context/globalState.ts";


export const End:React.FC = () => {
    const [users, setUsers] = useState<any>([]);
    const intl = useIntl();

    const {user} = useUserStore();
    const {points} = usePointsStore();

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

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Layout>
            <section className='bg-curious-blue/5 xl:h-screen xl:overflow-y-auto w-full flex items-center flex-col'>
                <Header/>

                <section className='p-8 bg-pickled-blue/50 h-full flex flex-col justify-center gap-4'>
                    <h2 className='text-white text-3xl text-center'>
                        {intl.formatMessage({id: 'hey'})} 👋  {user.nick}!
                    </h2>
                    <p className='text-white text-center'>
                        {intl.formatMessage({id: 'endMessage'})}
                    </p>
                    <p className='text-white text-center'>
                        {intl.formatMessage({id: 'score'})}: {points}
                    </p>
                    <p className='text-white text-center'>
                        {intl.formatMessage({id: 'motivationMessage'})}
                    </p>
                    <p className='text-white text-center'>
                        {intl.formatMessage({id: 'endInvitation'})}
                    </p>
                </section>
            </section>
            <section
                className='xl:h-screen xl:overflow-y-auto p-4 md:p-10 w-full bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 '>
                <h1 className='text-white text-center font-bold my-4 text-3xl'>
                    {intl.formatMessage({id: 'ranking'})}
                </h1>
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
                        users.map((userTable: any, index: number) => (
                            <tr className={`${userTable.nick === user.nick && 'bg-shamrock/80'}`} key={user.id}
                            >
                                <td className='border border-gray-50 text-center'>
                                    {index + 1}
                                </td>
                                <td className='flex items-center gap-2 border border-gray-50 px-8 py-2'>
                                    <img className='aspect-square w-10 rounded-full' src={userTable.avatar} alt='User'/>
                                    {userTable.nick}
                                </td>

                                <td className='border border-gray-50 text-center text-white'>
                                    {userTable.points}
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </section>
        </Layout>
    )
}