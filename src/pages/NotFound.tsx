import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      <div className="bg-white dark:bg-surface rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mx-auto w-16 h-16 flex items-center justify-center bg-error/10 rounded-full mb-6">
          <AlertTriangle size={32} className="text-error" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">404</h1>
        <h2 className="text-xl font-medium mb-4">Page Not Found</h2>
        
        <p className="text-text-secondary mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="primary"
            icon={<Home size={16} />}
            onClick={() => navigate('/')}
            fullWidth
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;