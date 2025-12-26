"use client";

import React from 'react';
import { ChevronRight, Calendar, Filter } from 'lucide-react';

export const Header = () => {
    return (
        <header className="h-20 sticky top-0 bg-background/80 backdrop-blur-xl z-40 px-8 flex items-center justify-between border-t border-transparent">
            <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">研发管理</span>
                <ChevronRight size={14} className="text-muted-foreground" />
                <span className="text-foreground font-bold tracking-tight">AI 代码审查仪表盘</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-secondary/50 px-4 py-1.5 rounded-full border border-border/30 text-xs font-bold cursor-pointer hover:bg-secondary transition-all">
                    <Calendar size={14} />
                    <span>2023 Q4 季度</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary/50 px-4 py-1.5 rounded-full border border-border/30 text-xs font-bold cursor-pointer hover:bg-secondary transition-all">
                    <Filter size={14} />
                    <span>全部核心项目</span>
                </div>
            </div>
        </header>
    );
};