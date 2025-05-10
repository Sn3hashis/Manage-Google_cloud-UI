export interface VM {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'terminated' | 'provisioning';
  zone: string;
  machineType: string;
  ip: string;
  tags: string[];
  created: string;
  cpu: number;
  memory: number;
  diskSize: number;
  cpuUsage: number;
  memoryUsage: number;
  networkIn: number;
  networkOut: number;
  cost: number;
}

export interface Network {
  id: string;
  name: string;
  subnet: string;
  region: string;
  ipRange: string;
  instances: number;
  status: 'active' | 'inactive';
}

export interface FirewallRule {
  id: string;
  name: string;
  network: string;
  direction: 'ingress' | 'egress';
  priority: number;
  action: 'allow' | 'deny';
  sourceRanges: string[];
  targetTags: string[];
  protocols: {
    tcp?: string[];
    udp?: string[];
    icmp?: boolean;
  };
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface ServiceAccount {
  id: string;
  name: string;
  email: string;
  roles: string[];
  created: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface ResourceUsage {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

export interface DashboardStats {
  activeVMs: number;
  stoppedVMs: number;
  networks: number;
  totalCost: number;
  resourceUsage: ResourceUsage;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export type ThemeMode = 'light' | 'dark';