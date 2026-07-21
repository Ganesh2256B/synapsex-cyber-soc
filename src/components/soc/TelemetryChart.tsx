import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { SystemMetrics } from '../../types';

interface TelemetryChartProps {
  history: SystemMetrics[];
  currentMetrics: SystemMetrics | null;
}

export const TelemetryChart: React.FC<TelemetryChartProps> = ({ history, currentMetrics }) => {
  const chartData = history.map((item) => ({
    time: item.timestamp.split('T')[1]?.substring(0, 8) || '',
    mbps: Number(item.bandwidthMbps.toFixed(2)),
    pps: item.packetsPerSecond,
    risk: item.riskIndex,
  }));

  const pb = currentMetrics?.protocolBreakdown || { tcp: 65, udp: 25, icmp: 8, other: 2 };

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-xl p-5 flex flex-col gap-4 font-mono">
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyber-cyan animate-pulse" />
          <h3 className="text-[14px] font-bold tracking-wider uppercase text-white">
            Real-Time Network Telemetry
          </h3>
        </div>
        <div className="flex items-center gap-4 text-[12px] text-white/60">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00f3ff]" /> Mbps Bandwidth
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff0055]" /> PPS (Packets/s)
          </span>
        </div>
      </div>

      {/* Main Area Chart */}
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="mbpsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00f3ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ppsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff0055" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ff0055" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#555" fontSize={10} tickLine={false} />
            <YAxis stroke="#555" fontSize={10} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0a0a0c',
                borderColor: '#333',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="mbps"
              stroke="#00f3ff"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#mbpsGrad)"
              name="Bandwidth (Mbps)"
            />
            <Area
              type="monotone"
              dataKey="pps"
              stroke="#ff0055"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#ppsGrad)"
              name="Packets / Sec"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Protocol Breakdown Gauge */}
      <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/10 text-[12px]">
        <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5 flex flex-col">
          <span className="text-white/40 text-[11px]">TCP Ratio</span>
          <span className="text-cyber-cyan font-bold text-[15px]">{pb.tcp}%</span>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-cyber-cyan h-full" style={{ width: `${pb.tcp}%` }} />
          </div>
        </div>
        <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5 flex flex-col">
          <span className="text-white/40 text-[11px]">UDP Ratio</span>
          <span className="text-cyber-amber font-bold text-[15px]">{pb.udp}%</span>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-cyber-amber h-full" style={{ width: `${pb.udp}%` }} />
          </div>
        </div>
        <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5 flex flex-col">
          <span className="text-white/40 text-[11px]">ICMP Ratio</span>
          <span className="text-cyber-red font-bold text-[15px]">{pb.icmp}%</span>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-cyber-red h-full" style={{ width: `${pb.icmp}%` }} />
          </div>
        </div>
        <div className="bg-white/[0.03] p-2.5 rounded-lg border border-white/5 flex flex-col">
          <span className="text-white/40 text-[11px]">Other Protocols</span>
          <span className="text-cyber-green font-bold text-[15px]">{pb.other}%</span>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-cyber-green h-full" style={{ width: `${pb.other}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};
