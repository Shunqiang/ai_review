"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1月', users: 400, reviews: 2400 },
  { name: '2月', users: 300, reviews: 1398 },
  { name: '3月', users: 200, reviews: 9800 },
  { name: '4月', users: 278, reviews: 3908 },
  { name: '5月', users: 189, reviews: 4800 },
];

export const UsageTrendChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="users" stroke="#137fec" name="每月活跃用户数" isAnimationActive={false} />
        <Line type="monotone" dataKey="reviews" stroke="#10b981" name="代码审查运行次数" isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
