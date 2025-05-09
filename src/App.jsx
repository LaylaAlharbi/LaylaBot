import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Layout from './components/shared/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatInterface from './components/chat/ChatInterface';
import PrivateRoute from './components/shared/PrivateRoute';
import TranscriptionPage from './pages/TranscriptionPage';
import ProfilePage from './components/profile/APIKeyManager';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes wrapped with Layout */}
            <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route path="/chat" element={<ChatInterface />} />
              <Route path="/transcribe" element={<TranscriptionPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              {/* Add other protected routes here */}

            </Route>
          </Routes>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;