import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import './App.css';
import Navbar from './pages/Navbar.jsx';
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import { AuthProvider } from './AuthContext.jsx';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
