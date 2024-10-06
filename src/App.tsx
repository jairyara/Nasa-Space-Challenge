import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {getIntl} from "./intl/i18n.ts";
import {useStore} from "./context/globalState.ts";
import {Welcome} from "./views/Welcome.tsx";
import {Register} from "./views/Register.tsx";
import {Instructions} from "./views/Instructions.tsx";
import {Challenge1} from "./views/Challenge1.tsx";
import {IntlProvider} from "react-intl";


const App: React.FC = () => {

    const locale = useStore(state => state.locale);

    const intl = getIntl(locale);


    return (
        <IntlProvider locale={intl.locale} messages={intl.messages}>
            <Router>
                <Routes>
                    <Route path="/" element={<Welcome/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/instructions" element={<Instructions/>}/>
                    <Route path='/co2-global' element={<Challenge1 />} />
                </Routes>
            </Router>
        </IntlProvider>
    )
}

export default App
