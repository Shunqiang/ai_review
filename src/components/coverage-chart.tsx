"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const Column = dynamic(() => import('@ant-design/charts').then((mod) => mod.Column), { ssr: false });

const data = [
  { name: 'Auth', coverage: 95 },
  { name: 'Payment', coverage: 82 },
  { name: 'User', coverage: 76 },
  { name: 'Data', coverage: 65 },
  { name: 'Report', coverage: 58 },
  { name: 'Import', coverage: 42 },
];

export const CoverageChart = () => {
  const config = {
    data,
    xField: 'name',
    yField: 'coverage',
    height: 250,
    legend: { position: 'top-right' },
    axis: {
      y: false,
      x: { label: { style: { fill: 'hsl(var(--muted-foreground))', fontSize: 10 } } },
    },
    style: {
      fill: ({ name }: { name: string }) => {
        const index = data.findIndex((d) => d.name === name);
        return `hsl(var(--primary) / ${1 - index * 0.15})`;
      },
      radiusTopLeft: 4,
      radiusTopRight: 4,
    },
    tooltip: {
      cursor: { fill: 'hsl(var(--secondary))', opacity: 0.4 },
      render: (event: any, { title, items }: any) => {
          return (
              <div className="bg-card border border-border rounded-lg p-2 shadow-sm text-xs">
                  <div className="text-foreground font-medium">{title}: {items[0]?.value}%</div>
              </div>
          );
      }
    },
  };

  return <Column {...config} />;
};

