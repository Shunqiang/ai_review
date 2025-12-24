"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const Scatter = dynamic(() => import('@ant-design/charts').then((mod) => mod.Scatter), { ssr: false });
const Treemap = dynamic(() => import('@ant-design/charts').then((mod) => mod.Treemap), { ssr: false });

const scatterData = [
  { changeLines: 1250, issueCount: 45, name: 'auth_core.ts', risk: 'Critical' }, // High LOC, High Issues (Logic Bomb?)
  { changeLines: 800, issueCount: 2, name: 'ui_library.ts', risk: 'Safe' },     // High LOC, Low Issues (Healthy Productivity)
  { changeLines: 50, issueCount: 12, name: 'utils_hacks.ts', risk: 'Critical' }, // Low LOC, High Issues (Dense Risk)
  { changeLines: 120, issueCount: 3, name: 'payment_api.ts', risk: 'Safe' },
  { changeLines: 340, issueCount: 25, name: 'order_sync.ts', risk: 'Critical' },
  { changeLines: 600, issueCount: 15, name: 'user_profile.ts', risk: 'Warning' },
  { changeLines: 45, issueCount: 0, name: 'config.json', risk: 'Safe' },
  { changeLines: 950, issueCount: 38, name: 'legacy_bridge.js', risk: 'Critical' },
  { changeLines: 200, issueCount: 4, name: 'notification.ts', risk: 'Safe' },
];

const treemapData = {
    name: 'root',
    children: [
        { name: 'Auth Module', value: 450, risk: 0.1 },
        { name: 'Payment Gateway', value: 800, risk: 0.8 },
        { name: 'Core Engine', value: 1200, risk: 0.4 },
        { name: 'UI Components', value: 600, risk: 0.2 },
        { name: 'Legacy Adapters', value: 300, risk: 0.6 },
        { name: 'Utils', value: 200, risk: 0.05 },
    ]
};

export const TacticalView = () => {
    const scatterConfig = {
        data: scatterData,
        xField: 'changeLines',
        yField: 'issueCount',
        colorField: 'risk',
        size: 8,
        shape: 'circle',
        pointStyle: { stroke: '#fff', lineWidth: 2 },
        xFieldLabel: { formatter: (v: any) => `${v} LOC` }, // Custom labels
        yAxis: {
             title: { text: '问题数量 (Issues)', style: { fontSize: 12, fill: '#666' } },
             grid: { line: { style: { stroke: '#f0f0f0', lineDash: [4, 4] } } }
        },
        xAxis: {
             title: { text: '变更行数 (Change Lines)', style: { fontSize: 12, fill: '#666' } },
             grid: { line: { style: { stroke: '#f0f0f0' } } }
        },
        scale: {
            color: {
                domain: ['Critical', 'Warning', 'Safe'],
                range: ['#ef4444', '#f59e0b', '#10b981'],
            },
        },
        tooltip: {
            fields: ['name', 'changeLines', 'issueCount'],
            formatter: (datum: any) => {
                return { name: datum.name, value: `${datum.changeLines} LOC, ${datum.issueCount} Issues` };
            },
        },
        annotations: [
            { type: 'lineX', xField: 400, style: { stroke: '#cbd5e1', lineDash: [4, 4] }, text: { content: 'High Impact Threshold', position: 'start', style: { fill: '#94a3b8', fontSize: 10 } } },
            { type: 'lineY', yField: 10, style: { stroke: '#cbd5e1', lineDash: [4, 4] }, text: { content: 'Quality Baseline', position: 'start', style: { fill: '#94a3b8', fontSize: 10 } } },
        ],
        legend: { position: 'top-right' },
    };

    const treemapConfig = {
        data: treemapData,
        colorField: 'name',
        height: 320,
        style: {
            stroke: '#fff',
            lineWidth: 2,
            fill: (d: any) => {
                const risk = d.risk || 0;
                if (risk > 0.7) return '#ef4444'; 
                if (risk > 0.4) return '#f59e0b';
                return '#f2f2f7';
            },
        },
        tooltip: { formatter: (v: any) => ({ name: v.name, value: `${v.value} LOC` }) },
        legend: { position: 'top-right' },
    };

    return (
        <section className="space-y-8">
            <h2 className="text-xl font-bold text-foreground px-4">战术风险评估 (Tactical View)</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-none shadow-apple bg-white overflow-hidden">
                    <CardHeader className="px-8 pt-8 pb-2">
                        <CardTitle className="text-lg font-bold">风险四象限分布 (Risk Quadrant)</CardTitle>
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-1">
                            X: 变更行数 · Y: 问题数量 · Point: 提交文件
                        </p>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <Scatter {...scatterConfig} height={320} />
                    </CardContent>
                </Card>

                <Card className="border-none shadow-apple bg-white overflow-hidden">
                    <CardHeader className="px-8 pt-8 pb-2">
                         <CardTitle className="text-lg font-bold">模块风险热力图</CardTitle>
                         <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-1">
                            Area: 变更密度 · Color: 风险等级
                        </p>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <Treemap {...treemapConfig} />
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};
