import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashBoard from './pages/UserDashBoard';
import AddJob from './pages/AddJob';
import EditJob from './pages/EditJob';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<ProtectedRoute><UserDashBoard /></ProtectedRoute>} />
        <Route path='/add' element={<ProtectedRoute><AddJob /></ProtectedRoute>} />
        <Route path='/edit/:id' element={<ProtectedRoute><EditJob /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
