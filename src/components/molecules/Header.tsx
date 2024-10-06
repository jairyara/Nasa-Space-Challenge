import React from 'react';
import {SwitchLang} from "../atoms/SwitchLang.tsx";
import {UserPill} from "../atoms/UserPill.tsx";
import {useUserStore} from "../../context/globalState.ts";

export const Header: React.FC = () => {
    const {user} = useUserStore();

    return (
        <header className='shadow shadow-white w-full h-20 flex items-center justify-around'>
            <UserPill user={user}/>
            <SwitchLang/>
        </header>
    )
}