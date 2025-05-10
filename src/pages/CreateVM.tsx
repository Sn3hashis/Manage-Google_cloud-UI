import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, HardDrive, Database, Network, Shield, Cpu, CheckCircle2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import TextInput from '../components/form/TextInput';
import Select from '../components/form/Select';
import ProgressBar from '../components/charts/ProgressBar';

const CreateVM: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    region: 'us-central1',
    zone: 'us-central1-a',
    machineType: 'e2-standard-2',
    cpu: 2,
    memory: 8,
    bootDiskType: 'balanced',
    bootDiskSize: 30,
    bootDiskImage: 'debian-11',
    networkTags: '',
    networkType: 'default',
    ipType: 'ephemeral',
    allowHttp: true,
    allowHttps: true,
  });

  const steps = [
    { id: 1, title: 'Name & Location', icon: <HardDrive size={18} /> },
    { id: 2, title: 'Machine Configuration', icon: <Cpu size={18} /> },
    { id: 3, title: 'Boot Disk', icon: <Database size={18} /> },
    { id: 4, title: 'Networking', icon: <Network size={18} /> },
    { id: 5, title: 'Security', icon: <Shield size={18} /> },
    { id: 6, title: 'Review', icon: <CheckCircle2 size={18} /> },
  ];

  const handleChange = (field: string, value: string | boolean | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const createVM = () => {
    // In a real app, this would make an API call
    console.log('Creating VM with data:', formData);
    alert('VM creation started! Redirecting to Compute Engine page.');
    navigate('/compute');
  };

  // Calculate estimated cost based on selected options
  const calculateCost = () => {
    // This is a simplified cost calculation for demo purposes
    const cpuCost = formData.cpu * 0.033; // per hour
    const memCost = formData.memory * 0.004; // per hour
    const diskCost = (formData.bootDiskType === 'ssd' ? 0.17 : 0.04) * formData.bootDiskSize / 30; // per hour
    
    const hourly = cpuCost + memCost + diskCost;
    const monthly = hourly * 24 * 30;
    
    return {
      hourly: hourly.toFixed(3),
      monthly: monthly.toFixed(2),
    };
  };

  const cost = calculateCost();

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button
          variant="text"
          icon={<ChevronLeft size={16} />}
          onClick={() => navigate('/compute')}
        >
          Back to Compute Engine
        </Button>
      </div>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create a Virtual Machine</h1>
        <p className="text-text-secondary mt-1">
          Configure and deploy a new virtual machine instance
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Step {currentStep} of {steps.length}</span>
          <span className="text-sm text-text-secondary">{steps[currentStep - 1].title}</span>
        </div>
        <ProgressBar 
          value={currentStep} 
          max={steps.length}
          height={8}
        />
      </div>

      {/* Steps indicator */}
      <div className="hidden md:flex justify-between mb-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex flex-col items-center ${
              step.id === currentStep
                ? 'text-primary'
                : step.id < currentStep
                ? 'text-success'
                : 'text-text-secondary'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              step.id === currentStep
                ? 'bg-primary/10 border-2 border-primary'
                : step.id < currentStep
                ? 'bg-success/10 border-2 border-success'
                : 'bg-surface border-2 border-border'
            }`}>
              {step.icon}
            </div>
            <span className="text-xs">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <Card className="mb-6">
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-medium mb-4">Name and Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                label="VM Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., my-vm-instance"
                helpText="Must be unique within the project"
                required
              />
              
              <Select
                label="Region"
                options={[
                  { value: 'us-central1', label: 'Iowa (us-central1)' },
                  { value: 'us-east1', label: 'South Carolina (us-east1)' },
                  { value: 'us-west1', label: 'Oregon (us-west1)' },
                  { value: 'europe-west1', label: 'Belgium (europe-west1)' },
                  { value: 'asia-east1', label: 'Taiwan (asia-east1)' },
                ]}
                value={formData.region}
                onChange={(value) => handleChange('region', value)}
              />
              
              <Select
                label="Zone"
                options={[
                  { value: 'us-central1-a', label: 'us-central1-a' },
                  { value: 'us-central1-b', label: 'us-central1-b' },
                  { value: 'us-central1-c', label: 'us-central1-c' },
                ]}
                value={formData.zone}
                onChange={(value) => handleChange('zone', value)}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-medium mb-4">Machine Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Machine Type"
                options={[
                  { value: 'e2-micro', label: 'E2 micro (2 vCPU, 1 GB memory)' },
                  { value: 'e2-small', label: 'E2 small (2 vCPU, 2 GB memory)' },
                  { value: 'e2-medium', label: 'E2 medium (2 vCPU, 4 GB memory)' },
                  { value: 'e2-standard-2', label: 'E2 standard (2 vCPU, 8 GB memory)' },
                  { value: 'e2-standard-4', label: 'E2 standard (4 vCPU, 16 GB memory)' },
                  { value: 'e2-standard-8', label: 'E2 standard (8 vCPU, 32 GB memory)' },
                ]}
                value={formData.machineType}
                onChange={(value) => {
                  // Update CPU and memory based on machine type
                  let cpu = 2;
                  let memory = 8;
                  
                  if (value === 'e2-micro') {
                    cpu = 2;
                    memory = 1;
                  } else if (value === 'e2-small') {
                    cpu = 2;
                    memory = 2;
                  } else if (value === 'e2-medium') {
                    cpu = 2;
                    memory = 4;
                  } else if (value === 'e2-standard-2') {
                    cpu = 2;
                    memory = 8;
                  } else if (value === 'e2-standard-4') {
                    cpu = 4;
                    memory = 16;
                  } else if (value === 'e2-standard-8') {
                    cpu = 8;
                    memory = 32;
                  }
                  
                  setFormData({
                    ...formData,
                    machineType: value,
                    cpu,
                    memory,
                  });
                }}
              />
              
              <div className="bg-surface p-4 rounded-md">
                <h3 className="text-sm font-medium mb-3">Machine Specifications</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>vCPUs</span>
                      <span>{formData.cpu} vCPUs</span>
                    </div>
                    <ProgressBar value={formData.cpu} max={8} height={6} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory</span>
                      <span>{formData.memory} GB</span>
                    </div>
                    <ProgressBar value={formData.memory} max={32} height={6} color="secondary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-medium mb-4">Boot Disk</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Operating System"
                options={[
                  { value: 'debian-11', label: 'Debian GNU/Linux 11' },
                  { value: 'ubuntu-20-04', label: 'Ubuntu 20.04 LTS' },
                  { value: 'ubuntu-22-04', label: 'Ubuntu 22.04 LTS' },
                  { value: 'centos-7', label: 'CentOS 7' },
                  { value: 'windows-2019', label: 'Windows Server 2019' },
                  { value: 'windows-2022', label: 'Windows Server 2022' },
                ]}
                value={formData.bootDiskImage}
                onChange={(value) => handleChange('bootDiskImage', value)}
              />
              
              <Select
                label="Boot Disk Type"
                options={[
                  { value: 'standard', label: 'Standard persistent disk' },
                  { value: 'balanced', label: 'Balanced persistent disk' },
                  { value: 'ssd', label: 'SSD persistent disk' },
                ]}
                value={formData.bootDiskType}
                onChange={(value) => handleChange('bootDiskType', value)}
              />
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Boot Disk Size (GB)
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={formData.bootDiskSize}
                    onChange={(e) => handleChange('bootDiskSize', parseInt(e.target.value))}
                    className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="ml-4 text-sm font-medium w-16">{formData.bootDiskSize} GB</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 className="text-xl font-medium mb-4">Networking</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Network"
                options={[
                  { value: 'default', label: 'Default' },
                  { value: 'custom-network-1', label: 'custom-network-1' },
                ]}
                value={formData.networkType}
                onChange={(value) => handleChange('networkType', value)}
              />
              
              <Select
                label="External IP"
                options={[
                  { value: 'ephemeral', label: 'Ephemeral' },
                  { value: 'none', label: 'None' },
                  { value: 'static', label: 'Static' },
                ]}
                value={formData.ipType}
                onChange={(value) => handleChange('ipType', value)}
              />
              
              <div className="md:col-span-2">
                <TextInput
                  label="Network Tags"
                  value={formData.networkTags}
                  onChange={(e) => handleChange('networkTags', e.target.value)}
                  placeholder="e.g., http-server,https-server (comma separated)"
                  helpText="Tags are used for network firewall rules and routes"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h2 className="text-xl font-medium mb-4">Security</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-border rounded-md">
                <div>
                  <h3 className="text-sm font-medium">Allow HTTP traffic</h3>
                  <p className="text-xs text-text-secondary mt-1">
                    Allows incoming traffic on port 80
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.allowHttp}
                    onChange={(e) => handleChange('allowHttp', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-border rounded-md">
                <div>
                  <h3 className="text-sm font-medium">Allow HTTPS traffic</h3>
                  <p className="text-xs text-text-secondary mt-1">
                    Allows incoming traffic on port 443
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.allowHttps}
                    onChange={(e) => handleChange('allowHttps', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="bg-surface p-4 rounded-md">
                <h3 className="text-sm font-medium mb-2">VM Service Account</h3>
                <p className="text-xs text-text-secondary mb-3">
                  The VM will use the default Compute Engine service account
                </p>
                <div className="text-xs border-l-2 border-primary pl-3 py-1 bg-primary/5">
                  compute@developer.gserviceaccount.com
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div>
            <h2 className="text-xl font-medium mb-4">Review VM Configuration</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Machine Configuration</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2 text-text-secondary">Name</td>
                      <td className="py-2 text-right">{formData.name || 'Not specified'}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-text-secondary">Region / Zone</td>
                      <td className="py-2 text-right">{formData.zone}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-text-secondary">Machine type</td>
                      <td className="py-2 text-right">{formData.machineType}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-text-secondary">vCPUs</td>
                      <td className="py-2 text-right">{formData.cpu} vCPUs</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-text-secondary">Memory</td>
                      <td className="py-2 text-right">{formData.memory} GB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Disk & Networking</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2 text-text-secondary">Boot disk</td>
                      <td className="py-2 text-right">{formData.bootDiskImage}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-text-secondary">Disk type</td>
                      <td className="py-2 text-right">{formData.bootDiskType}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-text-secondary">Disk size</td>
                      <td className="py-2 text-right">{formData.bootDiskSize} GB</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-text-secondary">Network</td>
                      <td className="py-2 text-right">{formData.networkType}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-text-secondary">External IP</td>
                      <td className="py-2 text-right">{formData.ipType}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-md">
              <h3 className="text-sm font-medium mb-2">Estimated Cost</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">
                    <span className="text-text-secondary">Hourly:</span> ${cost.hourly}
                  </p>
                  <p className="text-sm">
                    <span className="text-text-secondary">Monthly (estimated):</span> ${cost.monthly}
                  </p>
                </div>
                <div className="text-xs text-text-secondary max-w-xs">
                  Costs are estimates based on current pricing. Actual charges may vary based on usage, discounts, and other factors.
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {currentStep > 1 ? (
            <Button
              variant="secondary"
              onClick={goToPrevStep}
              icon={<ChevronLeft size={16} />}
            >
              Previous
            </Button>
          ) : (
            <Button
              variant="text"
              onClick={() => navigate('/compute')}
            >
              Cancel
            </Button>
          )}
          
          {currentStep < steps.length ? (
            <Button
              variant="primary"
              onClick={goToNextStep}
              icon={<ChevronRight size={16} />}
              iconPosition="right"
            >
              Next
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={createVM}
            >
              Create VM
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CreateVM;