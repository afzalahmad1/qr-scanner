
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Reader from './components/QR-Reader'
import Signup from './components/Signup';
import Login from './components/Login';
function App() {
  
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/upload" element={<Reader/>} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
