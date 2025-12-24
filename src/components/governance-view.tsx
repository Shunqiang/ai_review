"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const Bar = dynamic(() => import('@ant-design/charts').then((mod) => mod.Bar), { ssr: false });
const Pie = dynamic(() => import('@ant-design/charts').then((mod) => mod.Pie), { ssr: false });
const Line = dynamic(() => import('@ant-design/charts').then((mod) => mod.Line), { ssr: false });

const issueTypeData = [
  { type: '安全漏洞', value: 45 },
  { type: '性能瓶颈', value: 82 },
  { type: '代码风格', value: 156 },
  { type: '逻辑错误', value: 94 },
  { type: '测试缺失', value: 68 },
].sort((a, b) => b.value - a.value);

const severityData = [
  { type: 'Fatal', value: 12 },
  { type: 'Error', value: 89 },
  { type: 'Warning', value: 245 },
  { type: 'Info', value: 412 },
];

const trendData = [
    { date: '12-01', value: 45, type: 'Security' },
    { date: '12-05', value: 38, type: 'Security' },
    { date: '12-10', value: 32, type: 'Security' },
    { date: '12-15', value: 25, type: 'Security' },
    { date: '12-20', value: 18, type: 'Security' },
    { date: '12-01', value: 65, type: 'Logic' },
    { date: '12-05', value: 58, type: 'Logic' },
    { date: '12-10', value: 50, type: 'Logic' },
    { date: '12-15', value: 42, type: 'Logic' },
    { date: '12-20', value: 38, type: 'Logic' },
];

export const GovernanceView = () => {
    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold text-foreground">全局治理洞察 (Governance View)</h2>
                <div className="flex bg-secondary p-1 rounded-full border border-border/30">
                    <button className="px-5 py-1.5 text-[10px] font-bold bg-white shadow-sm rounded-full text-foreground uppercase tracking-widest">Global Architecture</button>
                    <button className="px-5 py-1.5 text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest">Project Alpha</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <Card className="border-none shadow-apple overflow-hidden">
                    <CardHeader className="p-8 border-b border-border/30">
                        <CardTitle className="text-lg font-bold text-foreground">系统性隐患洞察</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-12 p-8">
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-6">隐患类别分布 (TOP 5 Categories)</p>
                            <Bar 
                                data={issueTypeData} 
                                xField="type" 
                                yField="value" 
                                height={220}
                                legend={{ position: 'top-right' }}
                                style={{ fill: '#0071e3', radius: [0, 4, 4, 0] }}
                            />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-6">质量修复趋势 (Remediation Trend)</p>
                            <Line 
                                data={trendData} 
                                xField="date" 
                                yField="value" 
                                colorField="type" 
                                height={220} 
                                legend={{ position: 'top-right' }}
                                style={{ lineWidth: 4 }}
                                scale={{ color: { range: ['#ef4444', '#0071e3'] } }}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Right Column */}
                <Card className="border-none shadow-apple overflow-hidden">
                    <CardHeader className="p-8 border-b border-border/30">
                        <CardTitle className="text-lg font-bold text-foreground">风险热点与严重度权重</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-12 p-8">
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-6">高频变更模块风险排行</p>
                            <div className="space-y-6">
                                { [
                                    { name: 'payment/checkout.ts', score: 98, color: 'bg-[#ef4444]' },
                                    { name: 'auth/session_manager.ts', score: 85, color: 'bg-[#f59e0b]' },
                                    { name: 'data/query_builder.ts', score: 72, color: 'bg-[#1d1d1f]' },
                                    { name: 'ui/grid_layout.tsx', score: 45, color: 'bg-[#d2d2d7]' },
                                ].map((item) => (
                                    <div key={item.name} className="flex flex-col gap-3 p-4 rounded-2xl hover-lift border border-transparent hover:border-border/50">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[11px] font-bold text-foreground font-mono">{item.name}</span>
                                            <span className="text-[11px] font-black text-foreground">{item.score}% Risk</span>
                                        </div>
                                        <div className="w-full bg-secondary rounded-full h-1 overflow-hidden">
                                            <div className={`${item.color} h-1 rounded-full transition-all duration-1000`} style={{ width: `${item.score}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-6">严重程度分布比例</p>
                            <div className="flex items-center justify-center pt-2">
                                <Pie 
                                    data={severityData} 
                                    angleField="value" 
                                    colorField="type" 
                                    radius={0.8} 
                                    innerRadius={0.7} 
                                    height={240}
                                    legend={{ position: 'right' }}
                                    scale={{ color: { range: ['#1d1d1f', '#ef4444', '#f59e0b', '#0071e3'] } }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};
