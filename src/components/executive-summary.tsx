"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const StatCard = ({ title, value, change, isPositive, suffix = '' }: any) => (
    <div className="space-y-4">
        <p className="text-label">{title}</p>
        <div className="flex items-baseline gap-2">
            <span className="text-kpi">{value}</span>
            {suffix && <span className="text-sm font-bold text-muted-foreground">{suffix}</span>}
        </div>
        <div className={`text-[10px] font-bold flex items-center gap-1.5 ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            <span className="opacity-70">{isPositive ? '↑' : '↓'}</span>
            <span className="tracking-wide">{change} 环比增长</span>
        </div>
    </div>
);

export const ExecutiveSummary = () => {
    return (
        <section className="space-y-12">
            <Card className="border-none shadow-apple overflow-hidden relative">
                <CardContent className="p-12 lg:p-16 relative z-10">
                    <div className="max-w-4xl space-y-8">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]"></span>
                            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.25em]">System Status: Operating Normally</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-foreground">
                            AI 效能执行摘要
                        </h1>
                        <p className="text-muted-foreground text-xl leading-relaxed font-medium max-w-3xl">
                            本季度 AI 代码审查系统表现卓越：共自动化执行 <span className="text-foreground font-bold">2.5k+</span> 次深度扫描，
                            精准覆盖 <span className="text-foreground font-bold">12</span> 个核心业务项目。拦截 <span className="text-primary font-bold">487</span> 个高危安全漏洞，
                            研发效率与代码健壮性得到显著验证。
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 px-4">
                <StatCard title="审查执行总量" value="2,548" change="+12.5%" isPositive={true} />
                <StatCard title="月度活跃开发者" value="42" change="+3" isPositive={true} suffix="名" />
                <StatCard title="核心业务覆盖" value="12" change="0" isPositive={true} suffix="个" />
                <StatCard title="拦截致命风险" value="487" change="-12.1%" isPositive={true} suffix="个" />
            </div>
        </section>
    );
};
