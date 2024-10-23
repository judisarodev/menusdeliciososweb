import './App.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';  // Importa el tema de PrimeReact
import 'primereact/resources/primereact.min.css';         // Importa los estilos de PrimeReact
import 'primeicons/primeicons.css';                       // Importa los estilos de PrimeIcons
import { Home } from './landing/pages/home/Home';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './backoffice/pages/login/Login';
import { Panel } from './backoffice/pages/panel/Panel';
import { TokenContextProvider } from './backoffice/context/token/TokenContextProvider';
import { MenuContextProvider } from './backoffice/context/restaurant/MenuContext';
import { IconsContextProvider } from './backoffice/context/restaurant/IconsContext';
import { MenuContainer } from './landing/pages/menu-container/MenuContainer';
import { AnswerSurvey } from './backoffice/pages/answer-survey/AnswerSurvey';


function App() {

  return (
    <TokenContextProvider>
      <IconsContextProvider>
        <MenuContextProvider>
          <PrimeReactProvider>
            <div className="App">
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/terms' element={'Términos'} />
                  <Route path='/panel' element={<Panel />} />
                  <Route path='/:url' element={<MenuContainer />} />
                  <Route path='/:url/encuesta' element={<AnswerSurvey />} />
                </Routes>
              </BrowserRouter>
            </div>
          </PrimeReactProvider>
        </MenuContextProvider>
      </IconsContextProvider>
    </TokenContextProvider>
  );
}

export default App;
