import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChevronLeft,
  Menu,
  Monitor,
  Server,
  Network,
  Shield,
  Home,
  Moon,
  Sun,
  Bell,
  Search,
  User,
  HelpCircle,
  Settings,
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { label: 'Compute Engine', path: '/compute', icon: <Server size={20} /> },
    { label: 'Networking', path: '/networking', icon: <Network size={20} /> },
    { label: 'IAM & Security', path: '/iam', icon: <Shield size={20} /> },
    { label: 'Monitoring', path: '/monitoring', icon: <Monitor size={20} /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Top navbar */}
      <header className="h-14 border-b border-border flex items-center px-4 bg-white dark:bg-surface z-10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mr-4 p-2 rounded-full hover:bg-hover transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="text-text-secondary" />
        </button>
        
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8 text-primary" viewBox="0 0 128 128">
            <path 
              fill="currentColor" 
              d="M80.6 40.3h-32v24h32v-24zM80.6 88.2h-32v-8h32v8zM35 40.3h-8.6v8H35v-8zM35 64.3h-8.6v-8H35v8zM35 88.2h-8.6v-8H35v8zM101.8 40.3h-8.6v8h8.6v-8zM101.8 64.3h-8.6v-8h8.6v8zM101.8 88.2h-8.6v-8h8.6v8z"
            />
          </svg>
          <span className="text-xl font-medium">Google Cloud</span>
        </div>

        <div className="ml-8 flex-1 relative hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={18} className="text-text-secondary" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-full max-w-2xl rounded-md bg-surface border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        <div className="ml-auto flex items-center space-x-2">
          <button
            className="p-2 rounded-full hover:bg-hover transition-all"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon size={20} className="text-text-secondary" />
            ) : (
              <Sun size={20} className="text-text-secondary" />
            )}
          </button>
          
          <button className="p-2 rounded-full hover:bg-hover transition-all relative" aria-label="Notifications">
            <Bell size={20} className="text-text-secondary" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
          </button>
          
          <button className="p-2 rounded-full hover:bg-hover transition-all" aria-label="Help">
            <HelpCircle size={20} className="text-text-secondary" />
          </button>
          
          <button className="p-2 rounded-full hover:bg-hover transition-all" aria-label="Settings">
            <Settings size={20} className="text-text-secondary" />
          </button>
          
          <button className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
            U
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`border-r border-border bg-white dark:bg-surface transition-all duration-300 flex flex-col ${
            collapsed ? 'w-16' : 'w-64'
          }`}
        >
          <div className="p-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full p-2 rounded-md text-text-secondary hover:bg-hover flex items-center justify-center lg:justify-start"
            >
              <ChevronLeft
                size={20}
                className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
              />
              {!collapsed && <span className="ml-2">Collapse</span>}
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul className="py-2">
              {navItems.map((item) => (
                <li key={item.path} className="px-2 mb-1">
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full p-2 rounded-md flex items-center transition-colors ${
                      isActive(item.path)
                        ? 'bg-hover text-primary font-medium'
                        : 'text-text-secondary hover:bg-hover'
                    }`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!collapsed && <span className="ml-3">{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto p-4 text-xs text-text-secondary border-t border-border">
            {!collapsed && (
              <>
                <div className="mb-2">Project: demo-project</div>
                <div>v1.0.0</div>
              </>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-surface dark:bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;