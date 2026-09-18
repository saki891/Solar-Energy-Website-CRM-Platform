import React, { useState } from 'react';
import { 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Leaf, 
  Sun, 
  BatteryCharging, 
  Download, 
  Wrench, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ChevronRight, 
  User, 
  Activity,
  FileText
} from 'lucide-react';
import Eyebrow from './Eyebrow';

export default function DashboardPage({ theme, navigate }) {
  const [activeTab, setActiveTab] = useState('events');
  const [reportDownloaded, setReportDownloaded] = useState(false);

  const stats = [
    {
      title: "Today's Energy Generated",
      value: "34.8 kWh",
      change: "+12.4% vs avg",
      isPositive: true,
      icon: Zap,
      subtitle: "Peak output at 1:30 PM",
    },
    {
      title: "Monthly Cost Savings",
      value: "₹8,450",
      change: "₹42,300 total YTD",
      isPositive: true,
      icon: TrendingUp,
      subtitle: "Net metering credit active",
    },
    {
      title: "System Efficiency",
      value: "99.2%",
      change: "Optimal health",
      isPositive: true,
      icon: ShieldCheck,
      subtitle: "All 16 panels connected",
    },
    {
      title: "Carbon Offset",
      value: "1.45 Tons",
      change: "62 trees equivalent",
      isPositive: true,
      icon: Leaf,
      subtitle: "CO₂ emissions reduced",
    },
  ];

  const hourlyGeneration = [
    { time: '6 AM', kw: 0.4 },
    { time: '8 AM', kw: 2.1 },
    { time: '10 AM', kw: 4.8 },
    { time: '12 PM', kw: 6.8 },
    { time: '2 PM', kw: 6.2 },
    { time: '4 PM', kw: 3.5 },
    { time: '6 PM', kw: 1.2 },
  ];

  const logs = [
    {
      id: 1,
      title: 'Inverter Firmware Auto-Updated',
      time: 'Today, 08:30 AM',
      type: 'success',
      icon: CheckCircle2,
      desc: 'Solara Smart Inverter v4.2.1 installed smoothly with zero downtime.',
    },
    {
      id: 2,
      title: 'Grid Net-Metering Export Active',
      time: 'Yesterday, 02:15 PM',
      type: 'info',
      icon: Activity,
      desc: '18.4 kWh excess clean energy fed back into regional grid.',
    },
    {
      id: 3,
      title: 'Quarterly Panel Inspection Verified',
      time: 'Sep 10, 2026',
      type: 'success',
      icon: ShieldCheck,
      desc: 'On-site technical evaluation completed. Array performing at top efficiency.',
    },
    {
      id: 4,
      title: 'State Subsidy Disbursement Credit',
      time: 'Aug 28, 2026',
      type: 'success',
      icon: TrendingUp,
      desc: 'Government solar subsidy credit of ₹35,000 processed to bank account.',
    },
  ];

  const handleDownloadReport = () => {
    setReportDownloaded(true);
    setTimeout(() => setReportDownloaded(false), 3500);
  };

  return (
    <div className="py-8 sm:py-12 lg:py-16 transition-colors duration-200" style={{ backgroundColor: theme.bg }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Welcome Top Bar */}
        <div
          className="rounded-3xl p-6 sm:p-8 border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-200"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.border,
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0"
              style={{ backgroundColor: theme.green }}
            >
              <User className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full" style={{ backgroundColor: theme.greenSoft, color: theme.green }}>
                  Residential Customer
                </span>
                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live System
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1" style={{ color: theme.text }}>
                Welcome back, Alex Morgan!
              </h1>
              <p className="text-xs sm:text-sm mt-0.5" style={{ color: theme.textMuted }}>
                10.5 kW Rooftop Array • Solar Account ID: #SLR-98421
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadReport}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-colors focus:outline-none"
              style={{
                backgroundColor: theme.bgAlt,
                borderColor: theme.border,
                color: theme.text,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = theme.green)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = theme.border)}
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>{reportDownloaded ? 'Report Saved!' : 'Download Report'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('Contact')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-white transition-colors focus:outline-none"
              style={{ backgroundColor: theme.green }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.greenHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.green)}
            >
              <Wrench className="w-4 h-4" />
              <span>Book Service</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('Login')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border text-sm font-medium transition-colors focus:outline-none"
              style={{
                borderColor: theme.border,
                color: theme.textMuted,
              }}
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards Row */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl p-6 border transition-all duration-200 hover:shadow-sm flex flex-col justify-between"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium" style={{ color: theme.textFaint }}>
                    {stat.title}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: theme.greenSoft,
                      color: theme.green,
                    }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <div className="text-3xl font-bold tracking-tight" style={{ color: theme.text }}>
                    {stat.value}
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs font-medium">
                    <span className="text-emerald-600 font-semibold">{stat.change}</span>
                    <span style={{ color: theme.textFaint }}>{stat.subtitle}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Telemetry & System Grid (2 Columns) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Live Solar Telemetry Card (7 cols) */}
          <div
            className="lg:col-span-7 rounded-3xl p-6 sm:p-8 border shadow-sm transition-colors duration-200"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: theme.border }}>
              <div>
                <Eyebrow text="Live Telemetry" theme={theme} />
                <h2 className="text-xl font-bold tracking-tight mt-0.5" style={{ color: theme.text }}>
                  Generation & Storage Status
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: theme.greenSoft, color: theme.green }}>
                <Sun className="w-4 h-4 animate-spin-slow" />
                <span>6.8 kW Output</span>
              </div>
            </div>

            {/* Current Power Output Gauge */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm font-medium mb-2" style={{ color: theme.text }}>
                <span>Real-time Generation Power</span>
                <span className="font-bold text-emerald-600">6.8 kW / 10.5 kW Max</span>
              </div>
              <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: theme.bgAlt }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: '65%', backgroundColor: theme.green }}
                />
              </div>
            </div>

            {/* Battery Storage & Grid Status Row */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border" style={{ backgroundColor: theme.bgAlt, borderColor: theme.border }}>
                <div className="flex items-center gap-3">
                  <BatteryCharging className="w-6 h-6 text-emerald-600" />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: theme.text }}>Battery Charge</div>
                    <div className="text-xs" style={{ color: theme.textMuted }}>88% (9.2 kWh Stored)</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border" style={{ backgroundColor: theme.bgAlt, borderColor: theme.border }}>
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-emerald-600" />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: theme.text }}>Grid Export</div>
                    <div className="text-xs text-emerald-600 font-semibold">+2.4 kW Feeding Grid</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hourly Generation Chart Bars */}
            <div className="mt-8">
              <div className="text-sm font-semibold mb-4" style={{ color: theme.text }}>
                Today's Generation Curve (kW)
              </div>
              <div className="flex items-end justify-between h-40 pt-4 px-2 border-b" style={{ borderColor: theme.border }}>
                {hourlyGeneration.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 group flex-1">
                    <div className="text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: theme.green }}>
                      {item.kw}kW
                    </div>
                    <div
                      className="w-7 sm:w-9 rounded-t-lg transition-all duration-300"
                      style={{
                        height: `${(item.kw / 7) * 110}px`,
                        backgroundColor: idx === 3 ? theme.green : `${theme.green}80`,
                      }}
                    />
                    <span className="text-xs mt-1" style={{ color: theme.textFaint }}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Activity Logs & Quick Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* System Events Card */}
            <div
              className="rounded-3xl p-6 border shadow-sm transition-colors duration-200"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
              }}
            >
              <div className="flex items-center justify-between border-b pb-4 mb-4" style={{ borderColor: theme.border }}>
                <h3 className="text-lg font-bold tracking-tight" style={{ color: theme.text }}>
                  Recent System Events
                </h3>
                <span className="text-xs font-semibold cursor-pointer hover:underline" style={{ color: theme.green }}>
                  View All
                </span>
              </div>

              <div className="space-y-4">
                {logs.map((log) => {
                  const Icon = log.icon;
                  return (
                    <div key={log.id} className="flex items-start gap-3 text-sm">
                      <div className="p-2 rounded-xl flex-shrink-0 mt-0.5" style={{ backgroundColor: theme.greenSoft, color: theme.green }}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold leading-snug" style={{ color: theme.text }}>
                          {log.title}
                        </div>
                        <div className="text-xs mt-0.5 leading-relaxed" style={{ color: theme.textMuted }}>
                          {log.desc}
                        </div>
                        <div className="text-[11px] mt-1 font-medium" style={{ color: theme.textFaint }}>
                          {log.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Solar Support Box */}
            <div
              className="rounded-3xl p-6 border transition-colors duration-200"
              style={{
                backgroundColor: theme.greenSoft,
                borderColor: theme.border,
              }}
            >
              <h4 className="text-base font-bold tracking-tight" style={{ color: theme.text }}>
                Dedicated Solar Engineer
              </h4>
              <p className="text-xs leading-relaxed mt-1" style={{ color: theme.textMuted }}>
                Need technical assistance or seasonal cleaning for your rooftop array? Contact your assigned manager.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src="https://placehold.co/150x150/1F5C3E/FFFFFF?text=ER"
                  alt="Elena Rostova"
                  className="w-10 h-10 rounded-full object-cover border"
                  style={{ borderColor: theme.green }}
                />
                <div>
                  <div className="text-sm font-semibold" style={{ color: theme.text }}>Elena Rostova</div>
                  <div className="text-xs" style={{ color: theme.textFaint }}>Chief Solar Specialist</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
