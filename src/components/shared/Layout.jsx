import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
          

      {/* Navbar at the top */}
      <Navbar />
      
      {/* Main content area with sidebar and page content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - hidden on mobile */}
        <Sidebar />
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}