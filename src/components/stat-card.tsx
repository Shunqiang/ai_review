import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  suffix?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, suffix }) => {
  return (
    <div className="bg-card rounded-2xl p-5 border border-border shadow-soft hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
            <p className="text-muted-foreground text-sm font-medium">{title}</p>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400'}`}>
                {change}
            </span>
        </div>
        <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {suffix && <span className="text-muted-foreground text-sm mb-1">{suffix}</span>}
        </div>
    </div>
  );
};