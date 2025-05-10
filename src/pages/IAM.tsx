import React, { useState } from 'react';
import { UserPlus, Search, Filter, UserCog, Key, Shield } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import TextInput from '../components/form/TextInput';
import { roles, serviceAccounts } from '../mock/data';

const IAM: React.FC = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter roles based on search
  const filteredRoles = roles.filter(role => 
    searchQuery === '' || 
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.permissions.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter service accounts based on search
  const filteredServiceAccounts = serviceAccounts.filter(sa => 
    searchQuery === '' || 
    sa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sa.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sa.roles.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">IAM & Security</h1>
          <p className="text-text-secondary mt-1">
            Manage access control, roles, and service accounts
          </p>
        </div>
        <div>
          {activeTab === 'roles' ? (
            <Button
              variant="primary"
              icon={<Shield size={16} />}
            >
              Create Role
            </Button>
          ) : (
            <Button
              variant="primary"
              icon={<UserPlus size={16} />}
            >
              Create Service Account
            </Button>
          )}
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex border-b border-border mb-6">
        <button
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'roles'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text hover:border-border'
          }`}
          onClick={() => setActiveTab('roles')}
        >
          <span className="flex items-center">
            <Shield size={16} className="mr-2" />
            Roles
          </span>
        </button>
        <button
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'serviceAccounts'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text hover:border-border'
          }`}
          onClick={() => setActiveTab('serviceAccounts')}
        >
          <span className="flex items-center">
            <UserCog size={16} className="mr-2" />
            Service Accounts
          </span>
        </button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="w-full md:w-1/3">
            <TextInput
              placeholder={`Search ${activeTab === 'roles' ? 'roles' : 'service accounts'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="text"
              size="sm"
              icon={<Filter size={16} />}
            >
              Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Roles Tab Content */}
      {activeTab === 'roles' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="p-4 font-medium">Role Name</th>
                  <th className="p-4 font-medium">Description</th>
                  <th className="p-4 font-medium">Permissions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoles.map((role) => (
                  <tr key={role.id} className="border-b border-border hover:bg-hover">
                    <td className="p-4 font-medium">{role.name}</td>
                    <td className="p-4">{role.description}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permission, index) => (
                          <span 
                            key={index}
                            className="inline-block px-2 py-1 bg-surface text-xs rounded-md"
                          >
                            {permission}
                          </span>
                        ))}
                        {role.permissions.length > 3 && (
                          <span className="inline-block px-2 py-1 bg-surface text-xs rounded-md">
                            +{role.permissions.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredRoles.length === 0 && (
              <div className="text-center py-8">
                <p className="text-text-secondary">No roles found matching your search.</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Service Accounts Tab Content */}
      {activeTab === 'serviceAccounts' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Roles</th>
                  <th className="p-4 font-medium">Created</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServiceAccounts.map((account) => (
                  <tr key={account.id} className="border-b border-border hover:bg-hover">
                    <td className="p-4 font-medium">{account.name}</td>
                    <td className="p-4 text-text-secondary">{account.email}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {account.roles.slice(0, 2).map((role, index) => (
                          <span 
                            key={index}
                            className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                          >
                            {role}
                          </span>
                        ))}
                        {account.roles.length > 2 && (
                          <span className="inline-block px-2 py-1 bg-surface text-xs rounded-md">
                            +{account.roles.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-text-secondary">
                      {new Date(account.created).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="secondary" 
                          size="sm"
                          icon={<Key size={14} />}
                        >
                          Manage Keys
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredServiceAccounts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-text-secondary">No service accounts found matching your search.</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default IAM;