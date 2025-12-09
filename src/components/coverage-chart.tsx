"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'auth_service', coverage: 95 },
  { name: 'payment_gateway', coverage: 82 },
  { name: 'user_profile', coverage: 76 },
  { name: 'notification_svc', coverage: 65 },
  { name: 'reporting_engine', coverage: 58 },
  { name: 'data_importer', coverage: 42 },
];

export const CoverageChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="coverage" fill="#10b981" isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};
