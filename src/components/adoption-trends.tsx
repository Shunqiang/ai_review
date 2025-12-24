"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const DualAxes = dynamic(() => import('@ant-design/charts').then((mod) => mod.DualAxes), { ssr: false });
const Pie = dynamic(() => import('@ant-design/charts').then((mod) => mod.Pie), { ssr: false });

const usageData = [
    { date: '2023-11-01', count: 120, users: 15, projects: 5 },
    { date: '2023-11-08', count: 150, users: 18, projects: 5 },
    { date: '2023-11-15', count: 210, users: 22, projects: 6 },
    { date: '2023-11-22', count: 180, users: 20, projects: 6 },
    { date: '2023-11-29', count: 280, users: 25, projects: 8 },
    { date: '2023-12-06', count: 320, users: 30, projects: 10 },
    { date: '2023-12-13', count: 400, users: 35, projects: 12 },
    { date: '2023-12-20', count: 380, users: 42, projects: 12 },
];

const adoptionData = [
    { type: 'AI 采纳', value: 78.4 },
    { type: '误报/拒绝', value: 21.6 },
];

const severityData = [
    { type: '严重问题', value: 12, total: 100 },
    { type: '一般问题', value: 88, total: 100 },
];

export const AdoptionTrends = () => {
    const config = {
        xField: 'date',
        children: [
            {
                data: usageData,
                type: 'line',
                yField: 'count',
                color: '#1d1d1f', // Explicit color for Legend sync
                style: { lineWidth: 4 },
                axis: { y: { title: '扫描频次', titleFill: '#1d1d1f' } },
            },
            {
                data: usageData,
                type: 'line',
                yField: 'users',
                color: '#0071e3', // Explicit color for Legend sync
                style: { lineWidth: 4, lineDash: [4, 4] },
                axis: { y: { position: 'right', title: '用户规模', titleFill: '#0071e3' } },
            },
        ],
        interaction: { tooltip: true },
        legend: { position: 'top-right' },
    };

    const pieConfig = {
        appendPadding: 10,
        radius: 0.8,
        innerRadius: 0.7,
        legend: { position: 'bottom' },
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 12,
                fill: '#fff',
                fontWeight: 'bold',
            },
        },
        interactions: [{ type: 'element-active' }],
        statistic: {
            title: false,
            content: {
                style: {
                    fontSize: '18px',
                    fontWeight: 'bold',
                },
            },
        },
    };

    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 overflow-hidden border-none shadow-apple bg-white">
                <CardHeader className="px-8 pt-8 pb-4">
                    <CardTitle className="text-xl font-bold flex items-center justify-between">
                        使用趋势与渗透度
                        <span className="text-[10px] font-bold text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-wider">Growth View</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <DualAxes {...config} height={320} />
                </CardContent>
            </Card>

            <div className="flex flex-col gap-8">
                <Card className="flex-1 border-none shadow-apple bg-white overflow-hidden">
                    <CardHeader className="px-6 pt-6 pb-2">
                        <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                            AI 采纳率 / 误报率
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-48 relative">
                         <Pie 
                            {...pieConfig} 
                            data={adoptionData} 
                            angleField="value" 
                            colorField="type"
                            color={['#0071e3', '#e5e7eb']} // Blue for adopted, Grey for rejected
                            statistic={{
                                content: { formatter: () => '78.4%', style: { fontSize: '24px', fontWeight: 'bold' } }
                            }}
                        />
                    </CardContent>
                </Card>

                <Card className="flex-1 border-none shadow-apple bg-white overflow-hidden">
                    <CardHeader className="px-6 pt-6 pb-2">
                        <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                            严重问题占比
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-48 relative">
                          <Pie 
                            {...pieConfig} 
                            data={severityData} 
                            angleField="value" 
                            colorField="type" 
                            color={['#ef4444', '#f5f5f7']} // Red for severe, light grey for others
                            statistic={{
                                content: { formatter: () => '12%', style: { fontSize: '24px', fontWeight: 'bold', color: '#ef4444' } }
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};
