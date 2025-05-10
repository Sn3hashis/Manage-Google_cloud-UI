import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Cloud, Shield, Server, Database } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse: any) => {
    const decoded = jwtDecode(credentialResponse.credential);
    // Store user info in localStorage or state management
    localStorage.setItem('user', JSON.stringify(decoded));
    navigate('/dashboard');
  };

  const features = [
    {
      icon: <Cloud className="w-6 h-6 text-primary" />,
      title: 'Cloud Management',
      description: 'Manage all your cloud resources from a single dashboard',
    },
    {
      icon: <Shield className="w-6 h-6 text-secondary" />,
      title: 'Security First',
      description: 'Enterprise-grade security with IAM and firewall rules',
    },
    {
      icon: <Server className="w-6 h-6 text-accent" />,
      title: 'VM Management',
      description: 'Deploy and manage virtual machines with ease',
    },
    {
      icon: <Database className="w-6 h-6 text-success" />,
      title: 'Resource Monitoring',
      description: 'Real-time monitoring of all your cloud resources',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Features */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-4xl font-bold mb-4">
              Google Cloud Console
              <span className="text-primary">.</span>
            </h1>
            <p className="text-text-secondary text-lg mb-8">
              Manage your cloud infrastructure with our intuitive console. Access all your resources in one place.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 bg-white dark:bg-surface rounded-lg shadow-sm border border-border hover:border-primary/20 transition-colors"
                >
                  <div className="p-2 bg-primary/5 rounded-lg inline-block mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-medium mb-2">{feature.title}</h3>
                  <p className="text-text-secondary text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Login */}
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-surface p-8 rounded-xl shadow-lg border border-border">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                <p className="text-text-secondary">
                  Sign in with your Google account to continue
                </p>
              </div>

              <div className="flex justify-center mb-8">
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </div>

              <div className="text-center text-sm text-text-secondary">
                <p>By signing in, you agree to our</p>
                <div className="mt-1">
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>
                  {' '}&amp;{' '}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;