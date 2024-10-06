import React, {useEffect} from 'react';
import {usePointsStore} from "../../context/globalState.ts";
import supabase from "../../libs/supabaseClient.ts";
import {useIntl} from "react-intl";

interface UserPillProps {
    user: {
        nick: string;
        avatar: string;
        id: string;
    }
}

export const UserPill: React.FC<UserPillProps> = ({user}) => {

    const {points, setPoints} = usePointsStore();
    const intl = useIntl();

    const getPoints = async (id: string) => {
        const {data, error} = await supabase.from('Points').select('points').eq('user_id', id);
        if (error) {
            console.error('Error getting points:', error.message);
            return;
        }
        setPoints(data[0].points);
    }

    useEffect(() => {
        getPoints(user.id);
    }, [user.id]);

    return (
        <div className='flex items-center'>
            <img src={user.avatar} alt={user.nick} className='w-8 h-8 rounded-full'/>
            <span className='ml-2 text-xl uppercase text-white'>{user.nick}</span>
            <span className='ml-2 text-white'>{points} {intl.formatMessage({id: 'points'})}</span>
        </div>
    )
}