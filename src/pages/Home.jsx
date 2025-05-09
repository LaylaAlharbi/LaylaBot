import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import DarkModeToggle from '../components/DarkModeToggle';
import animationData from '../assets/Hello.json';
import animationChat from '../assets/AnimationNewColor.json';

export default function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/chat');
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <DarkModeToggle />

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden opacity-10 dark:opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg">
        {/* Top animation */}
        <div className="mb-2 transform hover:scale-110 transition-transform duration-300">
          <Lottie 
            animationData={animationData} 
            loop={true} 
            autoplay={true} 
            className="w-48 h-48 md:w-56 md:h-56" 
          />
        </div>

        {/* Main card */}
        <div className="w-full bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-gray-700/50 transition-all hover:shadow-2xl">
          <div className="p-8 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-300 mb-4">
              Welcome to LaylaBot
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Your intelligent assistant for <span className="font-medium text-indigo-600 dark:text-indigo-400">chat</span> and <span className="font-medium text-purple-600 dark:text-purple-400">audio transcription</span>
            </p>
            
            <div className="flex flex-col space-y-4">
              <Link 
                to="/login"
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
              >
                Get Started
              </Link>
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom animation */}
        <div className="mt-6 opacity-80 hover:opacity-100 transition-opacity">
          <Lottie 
            animationData={animationChat} 
            loop={true} 
            autoplay={true} 
            className="w-64 h-16" 
          />
        </div>
      </div>
    </div>
  );
}