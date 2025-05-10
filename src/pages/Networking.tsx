import React, { useState } from 'react';
import { Network as NetworkIcon, Plus, Filter, Search, Shield } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import TextInput from '../components/form/TextInput';
import Select from '../components/form/Select';
import { networks, firewallRules } from '../mock/data';

const Networking: React.FC = () => {
  const [activeTab, setActiveTab] = useState('networks');
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');

  // Filter networks based on search and region
  const filteredNetworks = networks.filter(network => {
    const matchesSearch = searchQuery === '' || 
      network.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      network.subnet.includes(searchQuery);
    
    const matchesRegion = regionFilter === 'all' || network.region === regionFilter;
    
    return matchesSearch && matchesRegion;
  });

  // Filter firewall rules based on search
  const filteredFirewallRules = firewallRules.filter(rule => 
    searchQuery === '' || 
    rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.network.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Networking</h1>
          <p className="text-text-secondary mt-1">
            Manage your virtual networks and firewall rules
          </p>
        </div>
        <div>
          {activeTab === 'networks' ? (
            <Button
              variant="primary"
              icon={<Plus size={16} />}
            >
              Create Network
            </Button>
          ) : (
            <Button
              variant="primary"
              icon={<Plus size={16} />}
            >
              Create Firewall Rule
            </Button>
          )}
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex border-b border-border mb-6">
        <button
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'networks'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text hover:border-border'
          }`}
          onClick={() => setActiveTab('networks')}
        >
          <span className="flex items-center">
            <NetworkIcon size={16} className="mr-2" />
            VPC Networks
          </span>
        </button>
        <button
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'firewall'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text hover:border-border'
          }`}
          onClick={() => setActiveTab('firewall')}
        >
          <span className="flex items-center">
            <Shield size={16} className="mr-2" />
            Firewall Rules
          </span>
        </button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="w-full md:w-1/3">
            <TextInput
              placeholder={`Search ${activeTab === 'networks' ? 'networks' : 'firewall rules'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
            />
          </div>
          
          {activeTab === 'networks' && (
            <div className="flex items-center gap-4">
              <Select
                label="Region"
                options={[
                  { value: 'all', label: 'All Regions' },
                  { value: 'us-central1', label: 'us-central1' },
                  { value: 'us-east1', label: 'us-east1' },
                  { value: 'us-west1', label: 'us-west1' },
                  { value: 'europe-west1', label: 'europe-west1' },
                ]}
                value={regionFilter}
                onChange={setRegionFilter}
                className="w-48"
              />
              
              <Button
                variant="text"
                size="sm"
                icon={<Filter size={16} />}
              >
                More Filters
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Networks Tab Content */}
      {activeTab === 'networks' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Subnet</th>
                  <th className="p-4 font-medium">Region</th>
                  <th className="p-4 font-medium">IP Range</th>
                  <th className="p-4 font-medium">Instances</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredNetworks.map((network) => (
                  <tr key={network.id} className="border-b border-border hover:bg-hover">
                    <td className="p-4 font-medium">{network.name}</td>
                    <td className="p-4">{network.subnet}</td>
                    <td className="p-4">{network.region}</td>
                    <td className="p-4">{network.ipRange}</td>
                    <td className="p-4">{network.instances}</td>
                    <td className="p-4">
                      <Badge variant={network.status === 'active' ? 'success' : 'warning'}>
                        {network.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredNetworks.length === 0 && (
              <div className="text-center py-8">
                <p className="text-text-secondary">No networks found matching your filters.</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Firewall Rules Tab Content */}
      {activeTab === 'firewall' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Network</th>
                  <th className="p-4 font-medium">Direction</th>
                  <th className="p-4 font-medium">Action</th>
                  <th className="p-4 font-medium">Priority</th>
                  <th className="p-4 font-medium">Source Ranges</th>
                  <th className="p-4 font-medium">Protocols/Ports</th>
                </tr>
              </thead>
              <tbody>
                {filteredFirewallRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-border hover:bg-hover">
                    <td className="p-4 font-medium">{rule.name}</td>
                    <td className="p-4">{rule.network}</td>
                    <td className="p-4 capitalize">{rule.direction}</td>
                    <td className="p-4">
                      <Badge variant={rule.action === 'allow' ? 'success' : 'error'}>
                        {rule.action}
                      </Badge>
                    </td>
                    <td className="p-4">{rule.priority}</td>
                    <td className="p-4">
                      {rule.sourceRanges.map((range, i) => (
                        <div key={i} className="whitespace-nowrap">{range}</div>
                      ))}
                    </td>
                    <td className="p-4">
                      {rule.protocols.tcp && (
                        <div className="mb-1">
                          TCP: {rule.protocols.tcp.join(', ')}
                        </div>
                      )}
                      {rule.protocols.udp && (
                        <div className="mb-1">
                          UDP: {rule.protocols.udp.join(', ')}
                        </div>
                      )}
                      {rule.protocols.icmp && (
                        <div>ICMP</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredFirewallRules.length === 0 && (
              <div className="text-center py-8">
                <p className="text-text-secondary">No firewall rules found matching your search.</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Networking;