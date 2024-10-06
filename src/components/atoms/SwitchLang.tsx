import { useStore} from "../../context/globalState.ts";
import {useIntl} from "react-intl";
import CO from '../../assets/flags/co.svg';
import US from '../../assets/flags/us.svg';

export const SwitchLang = () => {

    const setLocale = useStore(state => state.setLocale);
    const locale = useStore(state => state.locale);
    const intl = useIntl();

    return (
        <>
            <button className='text-white border px-4 h-10 rounded-3xl text-sm'
            onClick={()=>{
                setLocale(locale === 'en' ? 'es' : 'en');
            }}>
                {intl.formatMessage({id:'switch'})}
                <img src={locale === 'es' ? CO : US} alt="Flag" className='w-6 inline-block ml-2' />
                {locale === 'es' ? ' Español' : ' English'}
            </button>
        </>
    )
}