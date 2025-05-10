import React from 'react';
import { Server, Network, ShieldAlert, Activity, ArrowUpRight, Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import StatCard from '../components/dashboard/StatCard';
import Button from '../components/ui/Button';
import LineChart from '../components/charts/LineChart';
import ProgressBar from '../components/charts/ProgressBar';
import DonutChart from '../components/charts/DonutChart';
import { vms, dashboardStats, generateChartData } from '../mock/data';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Generate chart data
  const cpuData = generateChartData(20, 30, 75);
  const memoryData = generateChartData(20, 40, 85);
  const networkData = generateChartData(20, 20, 70);
  const costData = generateChartData(14, 25, 35);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-text-secondary mt-1">
            Overview of your Google Cloud resources
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            icon={<ArrowUpRight size={16} />}
          >
            View Reports
          </Button>
          <Button
            variant="primary" 
            icon={<Plus size={16} />}
            onClick={() => navigate('/compute/create')}
          >
            Create Resource
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Active VMs"
          value={dashboardStats.activeVMs}
          change={{ value: 12, direction: 'up' }}
          chartData={cpuData}
          icon={<Server size={18} className="text-primary" />}
        />
        <StatCard
          title="Networks"
          value={dashboardStats.networks}
          change={{ value: 0, direction: 'neutral' }}
          chartData={networkData}
          icon={<Network size={18} className="text-secondary" />}
        />
        <StatCard
          title="Security Alerts"
          value={2}
          change={{ value: 50, direction: 'down' }}
          chartData={generateChartData(20, 0, 5)}
          icon={<ShieldAlert size={18} className="text-warning" />}
        />
        <StatCard
          title="Daily Cost"
          value={`$${dashboardStats.totalCost.toFixed(2)}`}
          change={{ value: 8, direction: 'up' }}
          chartData={costData}
          icon={<Activity size={18} className="text-error" />}
        />
      </div>

      {/* Charts and details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2" title="Resource Utilization" subtitle="Last 24 hours">
          <div className="pt-4">
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <div className="text-sm">CPU Usage</div>
                <div className="text-sm font-medium">{dashboardStats.resourceUsage.cpu}%</div>
              </div>
              <ProgressBar value={dashboardStats.resourceUsage.cpu} color="primary" />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <div className="text-sm">Memory Usage</div>
                <div className="text-sm font-medium">{dashboardStats.resourceUsage.memory}%</div>
              </div>
              <ProgressBar value={dashboardStats.resourceUsage.memory} color="secondary" />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <div className="text-sm">Disk Usage</div>
                <div className="text-sm font-medium">{dashboardStats.resourceUsage.disk}%</div>
              </div>
              <ProgressBar value={dashboardStats.resourceUsage.disk} color="accent" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm">Network Usage</div>
                <div className="text-sm font-medium">{dashboardStats.resourceUsage.network}%</div>
              </div>
              <ProgressBar value={dashboardStats.resourceUsage.network} color="warning" />
            </div>
          </div>
        </Card>
        
        <Card title="Resource Distribution" subtitle="By type">
          <div className="flex justify-center py-4">
            <DonutChart
              data={[
                { label: 'Compute Engine', value: 65, color: 'rgba(26, 115, 232, 0.8)' },
                { label: 'Storage', value: 20, color: 'rgba(52, 168, 83, 0.8)' },
                { label: 'Networking', value: 10, color: 'rgba(251, 188, 4, 0.8)' },
                { label: 'Others', value: 5, color: 'rgba(234, 67, 53, 0.8)' },
              ]}
              showLegend
              animate
            />
          </div>
        </Card>
      </div>

      {/* Recent VMs section */}
      <div className="mb-6">
        <Card
          title="Recent VM Instances"
          subtitle="Active in the last 24 hours"
          actions={
            <Button
              variant="text"
              size="sm"
              onClick={() => navigate('/compute')}
            >
              View all
            </Button>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-text-secondary">
                  <th className="py-3 px-4 font-medium text-sm">Name</th>
                  <th className="py-3 px-4 font-medium text-sm">Status</th>
                  <th className="py-3 px-4 font-medium text-sm">Zone</th>
                  <th className="py-3 px-4 font-medium text-sm">CPU Usage</th>
                  <th className="py-3 px-4 font-medium text-sm">Memory</th>
                  <th className="py-3 px-4 font-medium text-sm">Cost/day</th>
                </tr>
              </thead>
              <tbody>
                {vms.slice(0, 5).map((vm) => (
                  <tr 
                    key={vm.id} 
                    className="border-t border-border hover:bg-hover cursor-pointer"
                    onClick={() => navigate('/compute')}
                  >
                    <td className="py-3 px-4">{vm.name}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        vm.status === 'running' 
                          ? 'bg-success' 
                          : vm.status === 'stopped' 
                          ? 'bg-warning' 
                          : 'bg-error'
                      }`}></span>
                      {vm.status.charAt(0).toUpperCase() + vm.status.slice(1)}
                    </td>
                    <td className="py-3 px-4">{vm.zone}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-24 mr-3">
                          <LineChart 
                            data={generateChartData(12, 10, vm.cpuUsage)}
                            height={20}
                            color="rgba(26, 115, 232, 0.7)"
                          />
                        </div>
                        <span>{vm.cpuUsage}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-16 mr-2">
                          <ProgressBar value={vm.memoryUsage} height={4} />
                        </div>
                        <span>{vm.memoryUsage}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">${vm.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Network traffic and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Network Traffic" subtitle="Last 24 hours">
          <div className="h-64 pt-4">
            <LineChart 
              data={generateChartData(24, 10, 80)}
              height={200}
              color="rgba(52, 168, 83, 0.8)"
              showAxis
              labels={['00:00', '06:00', '12:00', '18:00', '24:00']}
            />
          </div>
        </Card>
        
        <Card 
          title="Recent Alerts" 
          subtitle="Last 7 days"
          actions={
            <Button variant="text" size="sm">
              View all
            </Button>
          }
        >
          <div className="pt-2">
            <div className="py-3 border-b border-border">
              <div className="flex items-start">
                <div className="p-1 rounded-full bg-error/10 mr-3">
                  <ShieldAlert size={16} className="text-error" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">High CPU Utilization</h4>
                  <p className="text-xs text-text-secondary mt-1">
                    VM instance 'prod-web-server-1' has exceeded 90% CPU utilization for more than 15 minutes.
                  </p>
                  <div className="mt-2 text-xs text-text-secondary">
                    Today, 10:42 AM
                  </div>
                </div>
              </div>
            </div>
            
            <div className="py-3 border-b border-border">
              <div className="flex items-start">
                <div className="p-1 rounded-full bg-warning/10 mr-3">
                  <Activity size={16} className="text-warning" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Unusual Network Activity</h4>
                  <p className="text-xs text-text-secondary mt-1">
                    Unusual outbound traffic detected from VM instance 'batch-processor'.
                  </p>
                  <div className="mt-2 text-xs text-text-secondary">
                    Yesterday, 3:15 PM
                  </div>
                </div>
              </div>
            </div>
            
            <div className="py-3">
              <div className="flex items-start">
                <div className="p-1 rounded-full bg-success/10 mr-3">
                  <Server size={16} className="text-success" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">VM Auto-scaling Event</h4>
                  <p className="text-xs text-text-secondary mt-1">
                    Instance group 'web-servers' has scaled up from 3 to 5 instances.
                  </p>
                  <div className="mt-2 text-xs text-text-secondary">
                    3 days ago, 8:30 AM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;