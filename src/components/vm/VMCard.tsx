import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import LineChart from '../charts/LineChart';
import ProgressBar from '../charts/ProgressBar';
import { Play, Square, Terminal, Trash2, MoreVertical } from 'lucide-react';
import type { VM } from '../../types';

interface VMCardProps {
  vm: VM;
  onAction: (action: string, vmId: string) => void;
}

const VMCard: React.FC<VMCardProps> = ({ vm, onAction }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return <Badge variant="success">Running</Badge>;
      case 'stopped':
        return <Badge variant="warning">Stopped</Badge>;
      case 'terminated':
        return <Badge variant="error">Terminated</Badge>;
      case 'provisioning':
        return <Badge variant="default">Provisioning</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const cpuData = Array(12).fill(0).map(() => Math.random() * vm.cpuUsage);
  const memoryData = Array(12).fill(0).map(() => Math.random() * vm.memoryUsage);
  const networkData = Array(12).fill(0).map(() => Math.random() * (vm.networkIn + vm.networkOut));

  return (
    <Card className="h-full">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-medium">{vm.name}</h3>
          <div className="flex items-center mt-1 space-x-2">
            {getStatusBadge(vm.status)}
            <span className="text-sm text-text-secondary">{vm.zone}</span>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button
            variant="text"
            size="sm"
            className="p-1.5"
            aria-label="More options"
          >
            <MoreVertical size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-4">
        <div>
          <div className="text-xs text-text-secondary mb-1">IP Address</div>
          <div className="text-sm truncate">{vm.ip}</div>
        </div>
        <div>
          <div className="text-xs text-text-secondary mb-1">Machine Type</div>
          <div className="text-sm truncate">{vm.machineType}</div>
        </div>

        <div className="col-span-2">
          <div className="text-xs text-text-secondary mb-1">CPU Usage</div>
          <div className="flex items-center">
            <div className="flex-grow mr-3">
              <LineChart 
                data={cpuData}
                height={30}
                color="rgba(26, 115, 232, 0.8)"
              />
            </div>
            <span className="text-xs whitespace-nowrap">{Math.round(vm.cpuUsage)}%</span>
          </div>
        </div>

        <div className="col-span-2">
          <div className="text-xs text-text-secondary mb-1">Memory Usage</div>
          <ProgressBar
            value={vm.memoryUsage}
            max={100}
            height={6}
            color="primary"
            showLabel
            labelPosition="right"
          />
        </div>

        <div className="col-span-2">
          <div className="text-xs text-text-secondary mb-1">Network Traffic</div>
          <LineChart 
            data={networkData}
            height={30}
            color="rgba(52, 168, 83, 0.8)"
            labels={['', '']}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div className="text-sm">
          <span className="font-medium">${vm.cost.toFixed(2)}</span>
          <span className="text-text-secondary ml-1">/day</span>
        </div>
        <div className="flex space-x-2">
          {vm.status === 'stopped' ? (
            <Button
              variant="primary"
              size="sm"
              icon={<Play size={14} />}
              onClick={() => onAction('start', vm.id)}
            >
              Start
            </Button>
          ) : vm.status === 'running' ? (
            <Button
              variant="secondary"
              size="sm"
              icon={<Square size={14} />}
              onClick={() => onAction('stop', vm.id)}
            >
              Stop
            </Button>
          ) : null}
          <Button
            variant="secondary"
            size="sm"
            icon={<Terminal size={14} />}
            onClick={() => onAction('ssh', vm.id)}
          >
            SSH
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VMCard;