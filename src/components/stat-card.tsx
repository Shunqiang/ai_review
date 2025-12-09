import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-slate-600 dark:text-slate-300 text-base font-medium leading-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">{value}</p>
        <p className={isPositive ? 'text-green-500 dark:text-[#0bda5b]' : 'text-red-500 dark:text-[#fa6238]' + ' text-sm font-medium leading-normal'}>
          {change}
        </p>
      </CardContent>
    </Card>
  );
};