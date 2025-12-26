"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const Pie = dynamic(() => import('@ant-design/charts').then((mod) => mod.Pie), { ssr: false });

const issueData = [
  { name: '错误', value: 1447 },
  { name: '警告', value: 5071 },
];

const adoptionData = [
  { name: '已接受', value: 4680 },
  { name: '已忽略', value: 1838 },
];

const COLORS_ISSUE = ['#ef4444', '#f59e0b']; // Red, Amber
const COLORS_ADOPTION = ['#10b981', '#cbd5e1']; // Emerald, Slate-300

export const IssueAnalysisChart = () => {
    const issueConfig = {
        data: issueData,
        angleField: 'value',
        colorField: 'name',
        radius: 1,
        innerRadius: 0.7,
        height: 120,
        width: 120,
        legend: { position: 'right' },
        scale: {
            color: {
                range: COLORS_ISSUE,
            },
        },
        tooltip: {
            render: (event: any, { title, items }: any) => {
                return (
                    <div className="bg-card border border-border rounded-lg p-2 shadow-sm text-xs">
                        <div className="text-foreground font-medium">{items[0]?.name}: {items[0]?.value}</div>
                    </div>
                );
            }
        },
        annotations: [
            {
                type: 'text',
                style: {
                    text: '23%',
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    fill: 'hsl(var(--foreground))',
                },
            },
        ],
    };

    const adoptionConfig = {
        data: adoptionData,
        angleField: 'value',
        colorField: 'name',
        radius: 1,
        innerRadius: 0.7,
        height: 120,
        width: 120,
        legend: { position: 'right' },
        scale: {
            color: {
                range: COLORS_ADOPTION,
            },
        },
        tooltip: {
            render: (event: any, { title, items }: any) => {
                return (
                    <div className="bg-card border border-border rounded-lg p-2 shadow-sm text-xs">
                        <div className="text-foreground font-medium">{items[0]?.name}: {items[0]?.value}</div>
                    </div>
                );
            }
        },
        annotations: [
            {
                type: 'text',
                style: {
                    text: '72%',
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    fill: 'hsl(var(--foreground))',
                },
            },
        ],
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-around gap-2 pt-2">
            <div className="flex flex-col items-center gap-2">
                <Pie {...issueConfig} />
                <span className="text-xs text-muted-foreground">严重错误占比</span>
            </div>
            
            <div className="hidden sm:block w-px h-24 bg-border"></div>

            <div className="flex flex-col items-center gap-2">
                <Pie {...adoptionConfig} />
                <span className="text-xs text-muted-foreground">开发者采纳率</span>
            </div>
        </div>
    );
};

