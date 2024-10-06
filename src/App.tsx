import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {getIntl} from "./intl/i18n.ts";
import {useStore} from "./context/globalState.ts";
import {Welcome} from "./views/Welcome.tsx";
import {Register} from "./views/Register.tsx";
import {Instructions} from "./views/Instructions.tsx";
import {Challenge1} from "./views/Challenge1.tsx";
import {Challenge2} from "./views/Challenge2.tsx";
import {IntlProvider} from "react-intl";
import {Challenge3} from "./views/Challenge3.tsx";
import {End} from "./views/End.tsx";


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
                    <Route path='/co2-global-2' element={<Challenge2 />} />
                    <Route path='/temperature' element={<Challenge3 />} />
                    <Route path='/start-your-way' element={<End />} />
                </Routes>
            </Router>
        </IntlProvider>
    )
}

export default App
