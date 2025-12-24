"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Star, Quote, Heart } from 'lucide-react';

const feedback = [
    {
        user: "Zhang San",
        project: "Alpha Project",
        content: "AI 审查显著减少了我们在边界情况下的调试时间。",
        rating: 5
    },
    {
        user: "Li Si",
        project: "Beta Project",
        content: "非常精准的风险识别，帮助我们拦截了多次潜在的线上事故。",
        rating: 4
    },
    {
        user: "Wang Wu",
        project: "Infrastructure",
        content: "仪表盘的战术视图非常有洞察力，帮我们优化了核心链路。",
        rating: 5
    }
];

export const FeedbackSection = () => {
    return (
        <section className="space-y-12">
            <h2 className="text-xl font-bold text-foreground px-4">开发者反馈与原声 (Developer Voice)</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
                {feedback.map((item, index) => (
                    <Card key={index} className="border-none shadow-apple p-10 hover-lift group">
                        <CardHeader className="p-0 flex flex-row items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-foreground font-black border border-border/30">
                                {item.user[0]}
                            </div>
                            <div>
                                <CardTitle className="text-sm font-bold text-foreground">{item.user}</CardTitle>
                                <p className="text-label mt-0.5">{item.project}</p>
                            </div>
                            <div className="ml-auto text-muted-foreground opacity-20 group-hover:opacity-40 transition-opacity">
                                <Quote size={24} fill="currentColor" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <p className="text-sm text-foreground/60 leading-relaxed italic mb-8">
                                "{item.content}"
                            </p>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={10} fill={i < item.rating ? "#1d1d1f" : "none"} className={i < item.rating ? "text-foreground" : "text-border"} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <Card className="border border-primary/20 shadow-apple bg-primary/5 p-10 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-primary/10 transition-all">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Heart size={24} className="text-primary fill-primary" />
                    </div>
                    <CardTitle className="text-lg font-bold mb-3 text-primary">提交你的反馈</CardTitle>
                    <p className="text-xs text-muted-foreground leading-relaxed px-6">
                        您的建议将直接驱动 AI 代码审查能力的持续进化
                    </p>
                </Card>
            </div>
        </section>
    );
};
