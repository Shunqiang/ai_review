"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const Column = dynamic(() => import('@ant-design/charts').then((mod) => mod.Column), { ssr: false });

const data = [
    // Week 48
    { week: 'W48', project: 'Project A', type: 'Net Output (High Quality)', value: 450 },
    { week: 'W48', project: 'Project A', type: 'Risk Equivalent (Debt)', value: 120 },
    { week: 'W48', project: 'Project B', type: 'Net Output (High Quality)', value: 380 },
    { week: 'W48', project: 'Project B', type: 'Risk Equivalent (Debt)', value: 50 },
    
    // Week 49
    { week: 'W49', project: 'Project A', type: 'Net Output (High Quality)', value: 520 },
    { week: 'W49', project: 'Project A', type: 'Risk Equivalent (Debt)', value: 90 },
    { week: 'W49', project: 'Project B', type: 'Net Output (High Quality)', value: 410 },
    { week: 'W49', project: 'Project B', type: 'Risk Equivalent (Debt)', value: 60 },
    
    // Week 50
    { week: 'W50', project: 'Project A', type: 'Net Output (High Quality)', value: 480 },
    { week: 'W50', project: 'Project A', type: 'Risk Equivalent (Debt)', value: 150 },
    { week: 'W50', project: 'Project B', type: 'Net Output (High Quality)', value: 390 },
    { week: 'W50', project: 'Project B', type: 'Risk Equivalent (Debt)', value: 40 },

    // Week 51
    { week: 'W51', project: 'Project A', type: 'Net Output (High Quality)', value: 600 },
    { week: 'W51', project: 'Project A', type: 'Risk Equivalent (Debt)', value: 200 },
    { week: 'W51', project: 'Project B', type: 'Net Output (High Quality)', value: 450 },
    { week: 'W51', project: 'Project B', type: 'Risk Equivalent (Debt)', value: 80 },
];

export const StrategicView = () => {
    const config = {
        data,
        isGroup: true,
        isStack: true,
        xField: 'week',
        yField: 'value',
        seriesField: 'type',
        groupField: 'project',
        
        // Strict color mapping using function to ensure correct assignment
        color: (datum: any) => {
             if (datum.type === 'Risk Equivalent (Debt)') return '#ef4444';
             return '#0071e3';
        },
        
        columnStyle: {
            radius: [4, 4, 0, 0],
        },
        
        interaction: { tooltip: true },
        legend: {
            position: 'top-right',
        }
    };

    return (
        <section className="space-y-6">
            <h2 className="text-xl font-bold text-foreground px-2">质量战略演进 (Strategic View)</h2>

            <Card className="border-none shadow-apple overflow-hidden bg-white">
                <CardHeader className="px-8 pt-8 pb-4 border-b border-border/30 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-bold text-foreground">多项目质量演进矩阵</CardTitle>
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Comparing Net Output vs. Technical Debt Accumulation</p>
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    {/* @ts-ignore - groupField is valid in recent G2Plot but typescript definition might lag */}
                    <Column {...config} height={350} />
                    

                </CardContent>
            </Card>
        </section>
    );
};
