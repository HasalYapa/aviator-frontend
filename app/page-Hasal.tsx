"use client";

import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { Activity, Radio, History, Shield, Zap, TrendingUp, BrainCircuit } from 'lucide-react';


export default function Dashboard() {
    const { latestCrash, history, isConnected, isFlying } = useWebSocket('ws://localhost:8000/ws');
    const [lastUpdate, setLastUpdate] = useState<string>("");

    useEffect(() => {
        if (latestCrash) {
            setLastUpdate(latestCrash.timestamp || new Date().toLocaleTimeString());
        }
    }, [latestCrash]);

    // Calculate dynamic stats
    const avgMultiplier = history.length > 0
        ? (history.reduce((acc, curr) => acc + parseFloat(curr.value || "0"), 0) / history.length).toFixed(2)
        : "0.00";

    const maxMultiplier = history.length > 0
        ? Math.max(...history.map(h => parseFloat(h.value || "0"))).toFixed(2)
        : "0.00";

    return (
        <main className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-blue-500/30 overflow-x-hidden">
            {/* Animated Background Mesh */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px] animate-pulse delay-700" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto p-6 md:p-12 space-y-12">
                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/5">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <Radio className="w-6 h-6 text-blue-400 animate-pulse" />
                            </div>
                            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent italic uppercase">
                                Aviator<span className="text-blue-500 italic lowercase">Bridge</span>
                            </h1>
                        </div>
                        <p className="text-white/40 text-sm font-medium tracking-widest uppercase">
                            Real-Time Spribe Data Relay
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-2xl">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] rounded-xl border border-white/5 shadow-inner">
                            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse'}`} />
                            <span className="text-xs font-bold uppercase tracking-widest">
                                {isConnected ? 'Relay Linked' : 'Searching Relay...'}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Main Monitoring Area */}
                    <div className="lg:col-span-12 xl:col-span-8 space-y-8">
                        {/* Predictor Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Main Multiplier Display */}
                            <div className="glass rounded-[32px] p-8 flex flex-col items-center justify-center min-h-[400px] border border-white/10 shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-blue-500/20 group bg-[#0c0c0c]/50 backdrop-blur-xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex items-center gap-2 mb-6 bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20 relative z-10">
                                    <Zap className={`w-3.5 h-3.5 text-red-500 ${isFlying ? 'animate-pulse' : 'fill-red-500'}`} />
                                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">
                                        {isFlying ? 'Plane Flying' : 'Round Crashed'}
                                    </span>
                                </div>

                                <div className="relative z-10 text-center">
                                    <h1 className={`text-9xl font-black tracking-tighter transition-all duration-700 ${isFlying ? 'text-blue-400 animate-pulse scale-105' : 'text-white'}`}>
                                        {isFlying ? '???' : (latestCrash?.value || '0.00')}
                                        <span className={`text-4xl ml-1 transition-colors duration-500 ${isFlying ? 'text-blue-500/50' : 'text-red-500/50'}`}>x</span>
                                    </h1>
                                </div>

                                <div className="mt-10 flex gap-10 relative z-10">
                                    <div className="text-center">
                                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 mb-1 font-bold">Timestamp</p>
                                        <p className="text-sm font-mono text-white/60">{latestCrash?.timestamp || '--:--:--'}</p>
                                    </div>
                                    <div className="w-[1px] h-8 bg-white/5" />
                                    <div className="text-center">
                                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 mb-1 font-bold">Relay</p>
                                        <p className={`text-sm font-bold tracking-tight ${isConnected ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {isConnected ? 'ONLINE' : 'OFFLINE'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* AI Prediction Card */}
                            <div className={`glass rounded-[32px] p-8 flex flex-col items-center justify-center min-h-[400px] border transition-all duration-700 shadow-2xl overflow-hidden relative group bg-[#0c0c0c]/50 backdrop-blur-xl ${latestCrash?.signal_type === 'pink' ? 'border-pink-500/50 shadow-pink-500/20' :
                                latestCrash?.signal_type === 'purple' ? 'border-purple-500/30' :
                                    'border-white/10'
                                }`}>
                                <div className={`absolute inset-0 bg-gradient-to-br pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${latestCrash?.signal_type === 'pink' ? 'from-pink-500/20 to-transparent' :
                                    latestCrash?.signal_type === 'purple' ? 'from-purple-500/10 to-transparent' :
                                        'from-blue-500/10 to-transparent'
                                    }`} />

                                <div className={`flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border relative z-10 transition-colors duration-500 ${latestCrash?.signal_type === 'pink' ? 'bg-pink-500/20 border-pink-500/30 text-pink-300' :
                                    latestCrash?.signal_type === 'purple' ? 'bg-purple-500/10 border-purple-500/20 text-purple-300' :
                                        'bg-white/5 border-white/10 text-white/30'
                                    }`}>
                                    <BrainCircuit className={`w-4 h-4 ${latestCrash?.ml_active ? 'animate-pulse' : ''}`} />
                                    <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                                        {latestCrash?.ml_active ? `RF ENSEMBLE: ${latestCrash?.signal_type || 'ACTIVE'}` : 'ML ENGINE COLD START'}
                                    </span>
                                </div>

                                <div className="text-center relative z-10 w-full px-4">
                                    <div className={`text-2xl font-black mb-6 px-4 py-6 rounded-[24px] border transition-all duration-700 shadow-xl ${latestCrash?.signal_type === 'pink' ? 'bg-pink-500/20 border-pink-500/40 text-pink-400 animate-bounce' :
                                        latestCrash?.signal_type === 'purple' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' :
                                            latestCrash?.signal_type === 'blue' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                                                'bg-white/5 border-white/10 text-white/40'
                                        }`}>
                                        {latestCrash?.prediction || "STABILIZING"}
                                    </div>

                                    <div className="min-h-[48px] flex items-center justify-center">
                                        <p className={`text-[11px] font-mono uppercase tracking-tighter line-clamp-2 max-w-[220px] transition-colors duration-500 ${latestCrash?.signal_type === 'pink' ? 'text-pink-300' : 'text-white/40'
                                            }`}>
                                            {latestCrash?.reason || "Building probability baseline..."}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-10 grid grid-cols-2 gap-3 w-full relative z-10">
                                    <div className={`rounded-2xl p-4 border transition-all duration-500 ${latestCrash?.signal_type === 'pink' ? 'bg-pink-500/10 border-pink-500/20' : 'bg-white/5 border-white/5'
                                        }`}>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">PROBABILITY</p>
                                        <p className={`text-2xl font-black ${latestCrash?.signal_type === 'pink' ? 'text-pink-400' :
                                            latestCrash?.signal_type === 'purple' ? 'text-purple-400' :
                                                'text-white/70'
                                            }`}>
                                            {latestCrash?.confidence || 0}%
                                        </p>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 group-hover:bg-white/10 transition-colors">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1 text-right">GAP ANALYSIS</p>
                                        <p className="text-xl font-black text-blue-400 text-right">
                                            {latestCrash?.gap || 0}<span className="text-[10px] ml-1 text-white/20">RDS</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Welcome/Status Banner */}
                        <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[24px] border border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 text-blue-400">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-white">System Secure</p>
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest">End-to-End Encryption Active</p>
                                </div>
                            </div>
                            <div className="hidden md:block text-right">
                                <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest mb-1">Last Update</p>
                                <p className="text-xs font-mono text-white/60">{lastUpdate || 'Syncing...'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Side Panel: History & Stats */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-8">


                        {/* History Panel */}
                        <section className="bg-[#0c0c0c] rounded-[32px] border border-white/10 overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                <div className="flex items-center gap-3">
                                    <History className="w-5 h-5 text-blue-400" />
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Live History</h3>
                                </div>
                                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-md font-mono uppercase tracking-widest border border-blue-500/20">Syncing</span>
                            </div>

                            <div className="max-h-[450px] overflow-y-auto no-scrollbar p-6 space-y-3">
                                {history.length > 0 ? (
                                    history.map((entry: any, i) => {
                                        const val = parseFloat(entry.value || "0");
                                        let colorClass = "text-blue-400";
                                        let rangeLabel = "Blue";
                                        if (val >= 10.0) {
                                            colorClass = "text-pink-500";
                                            rangeLabel = "Pink";
                                        } else if (val >= 2.0) {
                                            colorClass = "text-purple-400";
                                            rangeLabel = "Purple";
                                        }

                                        return (
                                            <div
                                                key={i}
                                                className="flex flex-col p-4 bg-white/[0.03] hover:bg-white/[0.08] rounded-2xl border border-white/5 transition-all duration-200 group/item gap-2"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-8 h-8 flex items-center justify-center bg-[#050505] rounded-lg text-[10px] font-mono text-white/20">
                                                            {history.length - i}
                                                        </div>
                                                        <p className={`text-lg font-black ${colorClass} transition-colors uppercase`}>
                                                            {entry.value}x
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-1">
                                                        <span className="text-[10px] font-mono text-white/20 group-hover/item:text-white/40">
                                                            {entry.timestamp}
                                                        </span>
                                                        {entry.result && entry.result !== "N/A" && (
                                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${entry.result === "MATCH" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
                                                                }`}>
                                                                {entry.result}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between border-t border-white/5 pt-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Target:</span>
                                                        <span className="text-[9px] font-black text-white/60 uppercase">{entry.prediction || "N/A"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Range:</span>
                                                        <span className={`text-[9px] font-black uppercase ${colorClass}`}>{rangeLabel}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-20">
                                        <Activity className="w-8 h-8 text-white/5 mx-auto mb-4 animate-spin-slow" />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Establishing Link...</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-600/20 backdrop-blur-lg rounded-[24px] p-6 border border-blue-500/20 shadow-xl shadow-blue-500/5 group hover:bg-blue-600/30 transition-all cursor-default">
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400/60 mb-2">Session Max</p>
                                <p className="text-2xl font-black text-white tracking-tight">{maxMultiplier}x</p>
                            </div>
                            <div className="bg-white/[0.03] border border-white/10 backdrop-blur-lg rounded-[24px] p-6 shadow-xl group hover:bg-white/[0.08] transition-all cursor-default">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Avg Ratio</p>
                                <p className="text-2xl font-black text-white tracking-tight">{avgMultiplier}x</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .glass {
                    background: rgba(12, 12, 12, 0.7);
                    backdrop-filter: blur(20px);
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </main>
    );
}
