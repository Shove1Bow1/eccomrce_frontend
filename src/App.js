import './App.css';
import Login from "./components/Login";
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
  );
}

export default App;
