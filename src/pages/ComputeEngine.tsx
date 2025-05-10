import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, RefreshCw, FilterX, Filter } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import VMCard from '../components/vm/VMCard';
import TextInput from '../components/form/TextInput';
import Select from '../components/form/Select';
import { vms } from '../mock/data';
import type { VM } from '../types';

const ComputeEngine: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Generate unique zones from VMs
  const zones = Array.from(new Set(vms.map(vm => vm.zone)));
  
  const filteredVMs = vms.filter(vm => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      vm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vm.ip.includes(searchQuery) ||
      vm.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || vm.status === statusFilter;
    
    // Apply zone filter
    const matchesZone = zoneFilter === 'all' || vm.zone === zoneFilter;
    
    return matchesSearch && matchesStatus && matchesZone;
  });

  const handleVMAction = (action: string, vmId: string) => {
    // In a real application, this would make API calls to perform actions
    console.log(`Performing ${action} on VM ${vmId}`);
    
    // For demo purposes, show an alert
    alert(`${action.charAt(0).toUpperCase() + action.slice(1)} action triggered for VM ${vmId}`);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setZoneFilter('all');
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Compute Engine</h1>
          <p className="text-text-secondary mt-1">
            Manage your virtual machine instances
          </p>
        </div>
        <div>
          <Button
            variant="primary"
            icon={<PlusCircle size={16} />}
            onClick={() => navigate('/compute/create')}
          >
            Create VM
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="w-full md:w-1/3">
            <TextInput
              placeholder="Search by name, IP, or tag"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="text"
              size="sm"
              icon={showFilters ? <FilterX size={16} /> : <Filter size={16} />}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Filters'}
            </Button>
            
            <Button
              variant="text"
              size="sm"
              icon={<RefreshCw size={16} />}
              onClick={resetFilters}
            >
              Reset
            </Button>
          </div>
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
            <Select
              label="Status"
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'running', label: 'Running' },
                { value: 'stopped', label: 'Stopped' },
                { value: 'terminated', label: 'Terminated' },
                { value: 'provisioning', label: 'Provisioning' },
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
            />
            
            <Select
              label="Zone"
              options={[
                { value: 'all', label: 'All Zones' },
                ...zones.map(zone => ({ value: zone, label: zone })),
              ]}
              value={zoneFilter}
              onChange={setZoneFilter}
            />
          </div>
        )}
      </Card>

      {/* VM Grid */}
      {filteredVMs.length === 0 ? (
        <div className="bg-white dark:bg-surface rounded-lg border border-border p-8 text-center">
          <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-primary/10">
            <Search size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">No VMs Found</h3>
          <p className="text-text-secondary mb-4">
            No virtual machines match your current filters.
          </p>
          <Button variant="secondary" onClick={resetFilters}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredVMs.map((vm) => (
            <VMCard key={vm.id} vm={vm} onAction={handleVMAction} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComputeEngine;