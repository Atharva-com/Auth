import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';

function App() {
  return (
    <>
      <div>hello world</div>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/profile" element={<Profile />} />

      </Routes>
      
    </>
  );
}

export default App;
