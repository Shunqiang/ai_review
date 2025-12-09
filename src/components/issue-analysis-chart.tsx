"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const issueData = [
  { name: '错误', value: 1447 },
  { name: '警告', value: 5071 },
];

const adoptionData = [
  { name: '已接受', value: 4680 },
  { name: '已忽略', value: 1838 },
];

const COLORS_ISSUE = ['#ef4444', '#f59e0b'];
const COLORS_ADOPTION = ['#10b981', '#64748b'];

export const IssueAnalysisChart = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-4">
      <div className="flex flex-col items-center gap-4">
        <ResponsiveContainer width={140} height={140}>
          <PieChart>
            <Pie data={issueData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" isAnimationActive={false}>
              {issueData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS_ISSUE[index % COLORS_ISSUE.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-2 text-sm text-center">
          <div className="flex items-center gap-2 justify-center">
            <div className="size-2 rounded-full bg-red-500"></div>
            <span className="text-slate-600 dark:text-slate-300">错误: 1,447 (23%)</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <div className="size-2 rounded-full bg-amber-500"></div>
            <span className="text-slate-600 dark:text-slate-300">警告: 5,071 (77%)</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <ResponsiveContainer width={140} height={140}>
          <PieChart>
            <Pie data={adoptionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" isAnimationActive={false}>
              {adoptionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS_ADOPTION[index % COLORS_ADOPTION.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-2 text-sm text-center">
          <div className="flex items-center gap-2 justify-center">
            <div className="size-2 rounded-full bg-emerald-500"></div>
            <span className="text-slate-600 dark:text-slate-300">已接受: 4,680</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <div className="size-2 rounded-full bg-slate-500"></div>
            <span className="text-slate-600 dark:text-slate-300">已忽略: 1,838</span>
          </div>
        </div>
      </div>
    </div>
  );
};
