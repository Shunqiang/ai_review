"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const Pie = dynamic(() => import('@ant-design/charts').then((mod) => mod.Pie), { ssr: false });
const Line = dynamic(() => import('@ant-design/charts').then((mod) => mod.Line), { ssr: false });

// 常见问题排行榜 Top 5 - 按照参考图设计
const commonIssuesData = [
  { rank: 1, name: '空指针异常', value: 256, color: '#ef4444' },      // 红色
  { rank: 2, name: '未处理的 Promise', value: 231, color: '#f97316' }, // 橙色
  { rank: 3, name: '循环复杂度过高', value: 167, color: '#9ca3af' },    // 灰色
  { rank: 4, name: '硬编码密钥', value: 131, color: '#9ca3af' },       // 灰色
  { rank: 5, name: '未使用的变量', value: 67, color: '#d1d5db' },      // 浅灰色
];

// 严重程度分布 - 用于环形图
const severityData = [
  { type: 'Fatal', value: 12, label: '致命' },
  { type: 'Error', value: 89, label: '错误' },
  { type: 'Warning', value: 245, label: '警告' },
  { type: 'Info', value: 412, label: '提示' },
];

// 问题趋势数据 - 展示某一类问题的长期下降趋势
const issueTrendData = [
    { period: '1 周期', value: 18 },
    { period: '2 周期', value: 12 },
    { period: '3 周期', value: 10 },
    { period: '4 周期', value: 5 },
];

// 风险模块数据
const riskModules = [
    { name: 'payment/checkout.ts', score: 98, issues: 23, trend: 'up' },
    { name: 'auth/session_manager.ts', score: 85, issues: 15, trend: 'stable' },
    { name: 'data/query_builder.ts', score: 72, issues: 11, trend: 'down' },
    { name: 'ui/grid_layout.tsx', score: 45, issues: 5, trend: 'down' },
];

export const GovernanceView = () => {
    // 计算最大值用于比例计算
    const maxIssueValue = Math.max(...commonIssuesData.map(d => d.value));

    // 问题趋势折线图配置 - 单一类型，展示下降趋势
    const trendLineConfig = {
        data: issueTrendData,
        xField: 'period',
        yField: 'value',
        height: 160,
        style: { 
            lineWidth: 2.5,
            stroke: '#ef4444',
        },
        point: {
            shapeField: 'circle',
            sizeField: 6,
            style: {
                fill: '#ef4444',
                stroke: '#fff',
                lineWidth: 2,
            },
        },
        axis: {
            y: { 
                title: false,
                labelFormatter: (v: number) => `${v}`,
                grid: { line: { style: { stroke: '#f0f0f0', lineDash: [4, 4] } } },
            },
            x: {
                title: false,
            }
        },
        smooth: true,
    };

    // 严重程度环形图配置
    const pieConfig = {
        data: severityData,
        angleField: 'value',
        colorField: 'type',
        radius: 0.85,
        innerRadius: 0.65,
        height: 220,
        scale: { 
            color: { 
                domain: ['Fatal', 'Error', 'Warning', 'Info'],
                range: ['#1d1d1f', '#ef4444', '#f59e0b', '#0071e3'] 
            } 
        },
        label: {
            text: (d: any) => `${d.value}`,
            position: 'outside',
            style: { fontSize: 11, fontWeight: 'bold' },
        },
        legend: { 
            position: 'right',
            itemName: {
                formatter: (text: string) => {
                    const found = severityData.find(d => d.type === text);
                    return found ? `${found.label} (${found.value})` : text;
                }
            }
        },
        annotations: [
            {
                type: 'text',
                style: {
                    text: `${severityData.reduce((acc, d) => acc + d.value, 0)}`,
                    x: '50%',
                    y: '45%',
                    fontSize: 28,
                    fontWeight: 'bold',
                    fill: '#1d1d1f',
                    textAlign: 'center',
                },
            },
            {
                type: 'text',
                style: {
                    text: '总问题数',
                    x: '50%',
                    y: '58%',
                    fontSize: 11,
                    fill: '#86868b',
                    textAlign: 'center',
                },
            },
        ],
    };

    // 获取风险等级颜色
    const getRiskColor = (score: number) => {
        if (score >= 90) return { bg: 'bg-red-500', text: 'text-red-600', ring: 'ring-red-200' };
        if (score >= 70) return { bg: 'bg-amber-500', text: 'text-amber-600', ring: 'ring-amber-200' };
        if (score >= 50) return { bg: 'bg-slate-400', text: 'text-slate-600', ring: 'ring-slate-200' };
        return { bg: 'bg-green-500', text: 'text-green-600', ring: 'ring-green-200' };
    };

    // 趋势图标
    const TrendIcon = ({ trend }: { trend: string }) => {
        if (trend === 'up') return <span className="text-red-500 text-xs">↑</span>;
        if (trend === 'down') return <span className="text-green-500 text-xs">↓</span>;
        return <span className="text-slate-400 text-xs">→</span>;
    };

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
                {/* Left Column - 系统性隐患洞察 */}
                <Card className="border-none shadow-apple overflow-hidden">
                    <CardHeader className="p-8 border-b border-border/30">
                        <CardTitle className="text-lg font-bold text-foreground">系统性隐患洞察</CardTitle>
                        <p className="text-[11px] text-muted-foreground mt-1">团队常见问题排行榜与长期趋势分析</p>
                    </CardHeader>
                    <CardContent className="space-y-8 p-8">
                        {/* 常见问题排行榜 Top 5 */}
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-5">常见问题排行榜 Top 5</p>
                            <div className="space-y-4">
                                {commonIssuesData.map((item) => (
                                    <div key={item.rank} className="flex items-center gap-3">
                                        {/* 左侧：排名 + 问题名称 */}
                                        <div className="w-[140px] flex-shrink-0">
                                            <span className="text-[13px] text-foreground">
                                                <span className="text-muted-foreground">{item.rank}.</span> {item.name}
                                            </span>
                                        </div>
                                        
                                        {/* 中间：水平柱状条 */}
                                        <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden">
                                            <div 
                                                className="h-full rounded transition-all duration-700"
                                                style={{ 
                                                    width: `${(item.value / maxIssueValue) * 100}%`,
                                                    backgroundColor: item.color 
                                                }}
                                            />
                                        </div>
                                        
                                        {/* 右侧：数值 */}
                                        <span className="w-12 text-right text-[13px] font-bold text-foreground tabular-nums">
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 问题趋势变化 */}
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">问题趋势变化</p>
                            <Line {...trendLineConfig} />
                            <p className="text-[11px] text-muted-foreground text-center mt-4 italic">
                                某类低级错误的减少，意味着治理成功，规范已深入人心。
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Column - 风险热点与严重度 */}
                <Card className="border-none shadow-apple overflow-hidden">
                    <CardHeader className="p-8 border-b border-border/30">
                        <CardTitle className="text-lg font-bold text-foreground">风险热点与严重度权重</CardTitle>
                        <p className="text-[11px] text-muted-foreground mt-1">高频变更模块的风险评估与问题严重度分布</p>
                    </CardHeader>
                    <CardContent className="space-y-10 p-8">
                        {/* 高频变更模块风险排行 */}
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">高频变更模块风险排行</p>
                            <div className="space-y-3">
                                {riskModules.map((item, index) => {
                                    const colors = getRiskColor(item.score);
                                    return (
                                        <div 
                                            key={item.name} 
                                            className={`flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/60 transition-all cursor-pointer ring-1 ring-transparent hover:${colors.ring}`}
                                        >
                                            {/* 排名 */}
                                            <span className={`w-6 h-6 rounded-full ${colors.bg} flex items-center justify-center text-white text-xs font-bold`}>
                                                {index + 1}
                                            </span>
                                            
                                            {/* 模块信息 */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[12px] font-bold text-foreground font-mono truncate">{item.name}</span>
                                                    <TrendIcon trend={item.trend} />
                                                </div>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-[10px] text-muted-foreground">{item.issues} 个问题</span>
                                                    <div className="flex-1 bg-secondary rounded-full h-1.5 overflow-hidden max-w-[120px]">
                                                        <div 
                                                            className={`${colors.bg} h-1.5 rounded-full transition-all duration-700`} 
                                                            style={{ width: `${item.score}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* 风险分数 */}
                                            <span className={`text-lg font-black ${colors.text}`}>{item.score}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 严重程度分布 */}
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">严重程度分布比例</p>
                            <div className="flex items-center justify-center">
                                <Pie {...pieConfig} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};
