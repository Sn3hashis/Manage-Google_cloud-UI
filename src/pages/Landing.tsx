import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Cloud, Shield, Server, Database, Check, Brain, Cpu, Bot, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-12 h-12 text-primary" />,
      title: 'AI-Powered Insights',
      description: 'Leverage machine learning for intelligent resource optimization and predictive analytics.',
      gradient: 'from-primary/20 to-secondary/20',
    },
    {
      icon: <Shield className="w-12 h-12 text-secondary" />,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with AI-driven threat detection and automated compliance monitoring.',
      gradient: 'from-secondary/20 to-success/20',
    },
    {
      icon: <Bot className="w-12 h-12 text-accent" />,
      title: 'Automated Management',
      description: 'Smart automation for resource scaling, deployment, and maintenance powered by AI.',
      gradient: 'from-accent/20 to-primary/20',
    },
    {
      icon: <Sparkles className="w-12 h-12 text-success" />,
      title: 'Smart Optimization',
      description: 'AI-driven recommendations for cost optimization and performance improvements.',
      gradient: 'from-success/20 to-accent/20',
    },
  ];

  const aiCapabilities = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'Predictive Scaling',
      description: 'AI predicts resource needs and automatically scales your infrastructure',
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: 'Automated Security',
      description: 'ML-powered threat detection and automated response',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Smart Analytics',
      description: 'Advanced insights powered by machine learning',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Cost Intelligence',
      description: 'AI-driven cost optimization recommendations',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-accent/5 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              Powered by Advanced AI Technology
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Cloud Management,
              <br />
              Reimagined with AI
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              Experience the next generation of cloud infrastructure management.
              Harness the power of AI to optimize, secure, and scale your cloud resources.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight size={20} />}
                onClick={() => navigate('/login')}
                className="px-8 py-4 text-lg"
              >
                Get Started Free
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="px-8 py-4 text-lg"
              >
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
              <div className="p-6 rounded-xl bg-white/50 dark:bg-surface/50 backdrop-blur-sm">
                <div className="text-4xl font-bold text-primary">99.9%</div>
                <div className="text-text-secondary">Uptime Guaranteed</div>
              </div>
              <div className="p-6 rounded-xl bg-white/50 dark:bg-surface/50 backdrop-blur-sm">
                <div className="text-4xl font-bold text-secondary">45%</div>
                <div className="text-text-secondary">Cost Reduction</div>
              </div>
              <div className="p-6 rounded-xl bg-white/50 dark:bg-surface/50 backdrop-blur-sm">
                <div className="text-4xl font-bold text-accent">24/7</div>
                <div className="text-text-secondary">AI Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            AI-Powered Features
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            Our advanced AI technology transforms how you manage cloud infrastructure,
            making it more intelligent, efficient, and secure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-surface p-8 rounded-xl shadow-lg border border-border hover:border-primary/20 transition-all group hover:-translate-y-1"
              >
                <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Capabilities Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="p-1 rounded-full bg-primary/10 text-primary inline-block mb-4">
                Advanced AI Features
              </div>
              <h2 className="text-4xl font-bold mb-6">
                Harness the Power of
                <br />
                <span className="text-primary">Artificial Intelligence</span>
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {aiCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-surface">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {capability.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{capability.title}</h3>
                      <p className="text-text-secondary">{capability.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white dark:bg-surface p-8 rounded-3xl shadow-xl border border-border">
                  <h3 className="text-2xl font-bold mb-6">
                    Ready to Experience the Future?
                  </h3>
                  <p className="text-text-secondary mb-8">
                    Join thousands of companies using our AI-powered cloud management platform
                    to transform their infrastructure.
                  </p>
                  <div className="space-y-4">
                    <Button
                      variant="primary"
                      size="lg"
                      icon={<ArrowRight size={20} />}
                      onClick={() => navigate('/login')}
                      className="w-full"
                    >
                      Start Free Trial
                    </Button>
                    <p className="text-sm text-text-secondary text-center">
                      No credit card required
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;