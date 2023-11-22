import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <>
      <div>hello world</div>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoute />}>

          <Route path="/profile" element={<Profile />} />

        </Route>

      </Routes>

    </>
  );
}

export default App;
