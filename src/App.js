
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './Components/Auth';
import Footer from './Components/Footer';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import { useContext } from 'react';
import { tokenAuthorisationContext } from './Contexts/TokenAuth';


function App() {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthorisationContext)
  console.log(isAuthorized);
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth register/>} />
      <Route path='/dashboard' element={ isAuthorized? <Dashboard />: <Home />} />
      <Route path='/projects' element={ isAuthorized? <Projects />: <Home />} />
     </Routes>
     <Footer />
    
    </div>
  );
}

export default App;
