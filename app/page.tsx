"use client";

import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { Activity, Radio, History, Shield, Zap } from 'lucide-react';

export default function Dashboard() {
    const { data, history, isConnected } = useWebSocket('ws://35.232.58.251:8000/ws');

    // Local state for additional UI effects
    const [lastUpdate, setLastUpdate] = useState<string>("");

    useEffect(() => {
        if (data) {
            setLastUpdate(new Date().toLocaleTimeString());
        }
    }, [data]);

    return (
        <main className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-blue-500/30">
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
                                Sniffer<span className="text-blue-500 italic lowercase">PRO</span>
                            </h1>
                        </div>
                        <p className="text-white/40 text-sm font-medium tracking-widest uppercase">
                            Real-Time Middleman Data Stream
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-2 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] rounded-xl border border-white/5 shadow-inner">
                            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`} />
                            <span className="text-xs font-bold uppercase tracking-widest">
                                {isConnected ? 'Middleman Linked' : 'Connecting...'}
                            </span>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2">
                            <Shield className="w-4 h-4 text-white/40" />
                            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">SSL Secure</span>
                        </div>
                    </div>
                </header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Live Monitor Card */}
                    <div className="lg:col-span-12 xl:col-span-8 group">
                        <div className="relative bg-gradient-to-br from-white/10 to-transparent p-[1px] rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-[0_0_80px_rgba(59,130,246,0.1)]">
                            <div className="bg-[#0c0c0c] rounded-[31px] p-12 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
                                {/* Background Radar Effect */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                                    <div className="w-[300px] h-[300px] border border-blue-500 rounded-full animate-ping" />
                                    <div className="w-[500px] h-[500px] border border-blue-500/50 rounded-full animate-ping delay-300" />
                                </div>

                                <div className="z-10 text-center space-y-6">
                                    <div className="flex justify-center mb-8">
                                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black tracking-[0.2em] text-blue-400 uppercase">
                                            <Zap className="w-3 h-3 fill-current" /> Live Capture
                                        </span>
                                    </div>

                                    <div className="relative inline-block">
                                        <h2 className="text-[180px] leading-none font-black text-white tracking-tighter transition-all duration-300 transform group-hover:scale-105">
                                            {data?.value ? parseFloat(data.value).toFixed(2) : '0.00'}
                                            <span className="text-[40px] text-blue-500 font-bold -ml-2 italic underline decoration-blue-500/30">x</span>
                                        </h2>
                                    </div>

                                    <div className="flex items-center justify-center gap-8 pt-8 text-white/20">
                                        <div className="text-center">
                                            <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Last Update</p>
                                            <p className="text-sm font-mono text-white/60">{lastUpdate || '--:--:--'}</p>
                                        </div>
                                        <div className="w-[1px] h-8 bg-white/10" />
                                        <div className="text-center">
                                            <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Latency</p>
                                            <p className="text-sm font-mono text-white/60">~12ms</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Side Panels */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-8">

                        {/* AI Prediction Panel */}
                        <section className="bg-white/5 backdrop-blur-sm rounded-[32px] border border-white/10 overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Zap className="w-5 h-5 text-purple-400" />
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em]">AI Prediction</h3>
                                </div>
                                <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${data?.ml_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {data?.ml_active ? 'ML ACTIVE' : 'COLD'}
                                </span>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Next Signal</p>
                                        <p className={`text-2xl font-black tracking-tight ${data?.signal_type === 'pink' ? 'text-pink-500' : data?.signal_type === 'purple' ? 'text-purple-500' : 'text-blue-500'}`}>
                                            {data?.prediction || 'AWAITING...'}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Target Range</p>
                                        <p className="text-xl font-black text-white tracking-tight">
                                            {(!data?.prediction || data?.prediction?.includes('WAIT') || data?.prediction?.includes('SKIP')) ? 'N/A' : data?.signal_type === 'pink' ? '10.00x+' : data?.signal_type === 'purple' ? '2.00x - 5.00x' : '< 2.00x'}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Confidence</p>
                                        <p className="text-xl font-black text-white tracking-tight">{data?.confidence ? `${data.confidence}%` : '--'}</p>
                                    </div>
                                </div>
                                <div className="bg-[#0a0a0a] p-3 rounded-xl border border-white/5">
                                    <p className="text-xs text-white/60 font-mono">
                                        {data?.reason || 'Collecting data to generate prediction model...'}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* History Panel */}
                        <section className="bg-white/5 backdrop-blur-sm rounded-[32px] border border-white/10 overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <History className="w-5 h-5 text-blue-400" />
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Capture Log</h3>
                                </div>
                                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md font-mono text-white/40">50/50 CAP</span>
                            </div>

                            <div className="max-h-[500px] overflow-y-auto no-scrollbar p-6 space-y-3">
                                {history.length > 0 ? (
                                    history.map((entry: any, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all duration-200 group/item"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 flex items-center justify-center bg-[#0a0a0a] rounded-lg text-xs font-mono text-white/20">
                                                    {history.length - i}
                                                </div>
                                                <p className="text-lg font-black text-white/80 group-hover/item:text-blue-400 transition-colors">
                                                    {entry.value ? parseFloat(entry.value).toFixed(2) : '0.00'}x
                                                </p>
                                            </div>
                                            <span className="text-[10px] font-mono text-white/20 group-hover/item:text-white/40">
                                                {new Date(entry.timestamp).toLocaleTimeString([], { hour12: false })}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-20 animate-pulse">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Awaiting Signal...</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-600 rounded-[24px] p-6 shadow-lg shadow-blue-500/20">
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-100/60 mb-2">Max Session</p>
                                <p className="text-2xl font-black text-white tracking-tight">42.50x</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-[24px] p-6">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Avg Ratio</p>
                                <p className="text-2xl font-black text-white tracking-tight">1.84x</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </main>
    );
}
