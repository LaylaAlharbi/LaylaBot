import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // adjust the path if needed

import { 
  ChatBubbleLeftRightIcon,
  MicrophoneIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Replace with actual user data from your auth context or props
  const { currentUser, logout } = useAuth(); // Destructure logout here


  const navItems = [
    {
      path: '/chat',
      icon: ChatBubbleLeftRightIcon,
      label: 'Chat',
      activeColor: 'indigo'
    },
    {
      path: '/transcribe',
      icon: MicrophoneIcon,
      label: 'Transcription',
      activeColor: 'purple'
    },
    {
      path: '/profile',
      icon: Cog6ToothIcon,
      label: 'Settings',
      activeColor: 'indigo'
    }
  ];

  const handleSignOut = async () => {
    try {
      await logout(); // This calls the Firebase signOut
      navigate('/login');
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally show error to user
    }
  };

  const UserProfileSection = () => (
    <div className="px-3 py-4 border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <UserCircleIcon className="h-10 w-10 text-gray-400 dark:text-gray-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {currentUser?.displayName || "No Name"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {currentUser?.email || "No Email"}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
          aria-label="Open menu"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-64 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col">
          <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="flex-1 px-3 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex items-center px-3 py-3 text-sm rounded-lg transition-colors ${
                      isActive
                        ? `bg-${item.activeColor}-100/50 dark:bg-${item.activeColor}-900/30 text-${item.activeColor}-600 dark:text-${item.activeColor}-300 font-medium`
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon 
                      className={`mr-3 h-5 w-5 ${
                        isActive
                          ? `text-${item.activeColor}-500 dark:text-${item.activeColor}-400`
                          : 'text-gray-500 dark:text-gray-400'
                      }`} 
                    />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex flex-col">
            <UserProfileSection />
            <div className="px-3 pb-4">
              <button
                onClick={handleSignOut}
                className="w-full group flex items-center px-3 py-3 text-sm rounded-lg transition-colors text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
              >
                <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-r border-gray-200/50 dark:border-gray-700/50">
            <div className="h-full flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="flex-1 px-3 space-y-2 mt-16">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group flex items-center px-3 py-3 text-sm rounded-lg transition-colors ${
                        isActive
                          ? `bg-${item.activeColor}-100/50 dark:bg-${item.activeColor}-900/30 text-${item.activeColor}-600 dark:text-${item.activeColor}-300 font-medium`
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <Icon 
                        className={`mr-3 h-5 w-5 ${
                          isActive
                            ? `text-${item.activeColor}-500 dark:text-${item.activeColor}-400`
                            : 'text-gray-500 dark:text-gray-400'
                        }`} 
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="flex flex-col mt-auto">
                <UserProfileSection />
                <div className="px-3 pb-2">
                  <button
                    onClick={handleSignOut}
                    className="w-full group flex items-center px-3 py-3 text-sm rounded-lg transition-colors text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                  >
                    <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}