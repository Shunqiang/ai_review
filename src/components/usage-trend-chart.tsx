"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const Line = dynamic(() => import('@ant-design/charts').then((mod) => mod.Line), { ssr: false });

const data = [
  { name: '1月', value: 400, type: '每月活跃用户数' },
  { name: '1月', value: 2400, type: '代码审查运行次数' },
  { name: '2月', value: 300, type: '每月活跃用户数' },
  { name: '2月', value: 1398, type: '代码审查运行次数' },
  { name: '3月', value: 200, type: '每月活跃用户数' },
  { name: '3月', value: 9800, type: '代码审查运行次数' },
  { name: '4月', value: 278, type: '每月活跃用户数' },
  { name: '4月', value: 3908, type: '代码审查运行次数' },
  { name: '5月', value: 189, type: '每月活跃用户数' },
  { name: '5月', value: 4800, type: '代码审查运行次数' },
];

export const UsageTrendChart = () => {
  const config = {
    data,
    xField: 'name',
    yField: 'value',
    colorField: 'type',
    height: 250,
    legend: { position: 'top-right' },
    axis: {
      y: { label: null, grid: { line: { style: { lineDash: [4, 4], stroke: 'hsl(var(--border))', opacity: 0.5 } } } },
      x: { label: { style: { fill: 'hsl(var(--muted-foreground))', fontSize: 12 } } },
    },
    line: {
      style: {
        lineWidth: 3,
      },
    },
    point: {
      shapeField: 'dot',
      sizeField: 0,
    },
    tooltip: {
      showMarkers: true,
      enterable: true,
    },
    scale: {
      color: {
        range: ['#4f46e5', '#10b981'],
      },
    },
    interaction: {
        tooltip: {
            render: (event: any, { title, items }: any) => {
                return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                        <div className="text-foreground font-bold mb-2">{title}</div>
                        {items.map((item: any) => (
                            <div key={item.name} className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <div className="text-muted-foreground text-xs">{item.name}:</div>
                                <div className="text-foreground text-xs font-medium">{item.value}</div>
                            </div>
                        ))}
                    </div>
                );
            }
        }
    }
  };

  return <Line {...config} />;
};

