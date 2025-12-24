"use client";

import React from 'react';
import { LayoutDashboard, ShieldCheck, Target, BarChart4, Settings, UserCircle } from 'lucide-react';

export const Sidebar = () => {
    return (
        <aside className="w-20 h-screen fixed left-0 top-0 flex flex-col items-center py-10 border-none bg-background/80 backdrop-blur-xl z-50">
            <div className="mb-12">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30">
                    <ShieldCheck size={20} strokeWidth={2.5} />
                </div>
            </div>

            <nav className="flex-1 flex flex-col gap-8">
                <button className="sidebar-icon sidebar-icon-active" title="仪表盘">
                    <LayoutDashboard size={20} />
                </button>
                <button className="sidebar-icon" title="战术风险">
                    <Target size={20} />
                </button>
                <button className="sidebar-icon" title="治理洞察">
                    <BarChart4 size={20} />
                </button>
                <button className="sidebar-icon" title="系统设置">
                    <Settings size={20} />
                </button>
            </nav>

            <div className="mt-auto">
                <button className="sidebar-icon">
                    <UserCircle size={20} />
                </button>
            </div>
        </aside>
    );
};
