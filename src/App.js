import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Employee from './components/Employee';
function App() {
  return (
    <>
 
   <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='emp/:id' element={<Employee/>}/>
    </Routes>
  </BrowserRouter>
  
    
    </>
 
 
 );
}

export default App;
