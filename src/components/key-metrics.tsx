"use client";

import React from 'react';
import { Card } from './ui/card';

const MetricCard = ({ title, value, change, isPositive, suffix = '' }: any) => (
    <Card className="p-6 border-none shadow-apple hover:shadow-apple-hover transition-all duration-300">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{title}</p>
        <div className="flex items-baseline gap-1 mb-2">
            <span className="text-3xl font-bold text-foreground tabular-nums">{value}</span>
            {suffix && <span className="text-xs font-semibold text-muted-foreground">{suffix}</span>}
        </div>
        <div className={`text-[10px] font-bold flex items-center gap-1.5 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            <span className={`flex items-center justify-center w-4 h-4 rounded-full ${isPositive ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                {isPositive ? '↑' : '↓'}
            </span>
            <span>{change} 环比</span>
        </div>
    </Card>
);

export const KeyMetrics = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard title="审查执行总量" value="2,548" change="+12.5%" isPositive={true} />
            <MetricCard title="月度活跃开发者" value="42" change="+3" isPositive={true} suffix="名" />
            <MetricCard title="核心业务覆盖" value="12" change="0" isPositive={true} suffix="个" />
            <MetricCard title="拦截致命风险" value="487" change="-12.1%" isPositive={true} suffix="个" />
        </div>
    );
};
