"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { group } from 'console';

const Column = dynamic(() => import('@ant-design/charts').then((mod) => mod.Column), { ssr: false });

const data = [
    // Week 48
    { week: 'day1', project: 'Project A', type: '净产出（高质量）', value: 450 },
    { week: 'day1', project: 'Project A', type: '风险等价（债务）', value: 50 },

    { week: 'day2', project: 'Project A', type: '净产出（高质量）', value: 120 },
    { week: 'day2', project: 'Project A', type: '风险等价（债务）', value: 60 },
    // Week 49
    { week: 'day3', project: 'Project A', type: '净产出（高质量）', value: 520 },
    { week: 'day3', project: 'Project A', type: '风险等价（债务）', value: 20 },
    { week: 'day4', project: 'Project A', type: '净产出（高质量）', value: 90 },
    { week: 'day4', project: 'Project A', type: '风险等价（债务）', value: 10 },
    { week: 'day5', project: 'Project A', type: '净产出（高质量）', value: 480 },
    { week: 'day5', project: 'Project A', type: '风险等价（债务）', value: 40 },
    { week: 'day6', project: 'Project A', type: '净产出（高质量）', value: 150 },
    { week: 'day6', project: 'Project A', type: '风险等价（债务）', value: 10 },
    { week: 'day7', project: 'Project A', type: '净产出（高质量）', value: 600 },
    { week: 'day7', project: 'Project A', type: '风险等价（债务）', value: 60 },
    { week: 'day8', project: 'Project A', type: '净产出（高质量）', value: 200 },
    { week: 'day8', project: 'Project A', type: '风险等价（债务）', value: 20 },

    { week: 'day1', project: 'Project B', type: '净产出（高质量）', value: 380 },
    { week: 'day1', project: 'Project B', type: '风险等价（债务）', value: 38 },

    { week: 'day2', project: 'Project B', type: '净产出（高质量）', value: 50 },
    { week: 'day2', project: 'Project B', type: '风险等价（债务）', value: 5 },
    { week: 'day3', project: 'Project B', type: '净产出（高质量）', value: 410 },
    { week: 'day3', project: 'Project B', type: '风险等价（债务）', value: 41 },
    { week: 'day4', project: 'Project B', type: '净产出（高质量）', value: 60 },
    { week: 'day4', project: 'Project B', type: '风险等价（债务）', value: 6 },

    // Week 50

    { week: 'day5', project: 'Project B', type: '净产出（高质量）', value: 390 },
    { week: 'day5', project: 'Project B', type: '风险等价（债务）', value: 39 },
    { week: 'day6', project: 'Project B', type: '净产出（高质量）', value: 40 },
    { week: 'day6', project: 'Project B', type: '风险等价（债务）', value: 4 },

    // Week 51

    { week: 'day7', project: 'Project B', type: '净产出（高质量）', value: 450 },
    { week: 'day8', project: 'Project B', type: '风险等价（债务）', value: 8 },
];

export const StrategicView = () => {
    const config = {
        data,
        xField: 'week',
        yField: 'value',
        seriesField: 'project',
        stack: {
            groupBy: ['x', 'series'],
        },

        colorField: 'type',
        scale: {
            color: {
                type: 'ordinal',
                range: ['#1890ff', '#ff4d4f'] // 蓝色(高质量) & 红色(风险)
            }
        },
        columnStyle: {
            radius: [4, 4, 0, 0],
        },

        legend: {
            position: 'top-right',
        },
        tooltip: (item) => {
            return { origin: item };
        },
        interaction: {
            tooltip: {
                render: (e, { title, items }) => {
                    return (
                        <div>
                            <h4>{title}</h4>
                            {items.map((item) => {
                                console.log(item)
                                const { name, color, origin } = item;
                                return (
                                    <div>
                                        <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                                            <div>
                                                <span
                                                    style={{
                                                        display: 'inline-block',
                                                        width: 6,
                                                        height: 6,
                                                        borderRadius: '50%',
                                                        backgroundColor: color,
                                                        marginRight: 6,
                                                    }}
                                                ></span>
                                                <span>
                                                    {name}
                                                </span>
                                            </div>
                                            <b>{origin['value']}</b>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                },
            },
        },
    };

    return (
        <section className="space-y-6">
            <h2 className="text-xl font-bold text-foreground px-2">质量战略演进 (Strategic View)</h2>

            <Card className="border-none shadow-apple overflow-hidden bg-white">
                <CardHeader className="px-8 pt-8 pb-4 border-b border-border/30 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-bold text-muted-foreground">多项目质量演进矩阵</CardTitle>
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Comparing Net Output vs. Technical Debt Accumulation</p>
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    {/* @ts-ignore - groupField is valid in recent G2Plot but typescript definition might lag */}
                    <Column {...config} height={350} />


                </CardContent>
            </Card>
        </section>
    );
};
