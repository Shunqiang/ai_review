"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Star, Quote, Heart } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Controller, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
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
    },
    {
        user: "jiang Wu",
        project: "Infrastructure",
        content: "我喜欢这个功能",
        rating: 2
    }
];



export const FeedbackSection = () => {
    return (
        <section className="space-y-12">
            <h2 className="text-xl font-bold text-foreground px-4">开发者反馈与原声 (Developer Voice)</h2>

            <div className="px-4">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    navigation={true}
                    spaceBetween={48}
                    slidesPerView={1}
                    loop={true}
                    // autoplay={{
                    //     delay: 4000,
                    //     disableOnInteraction: false,
                    // }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="w-full py-10"
                >
                    {feedback.map((item, index) => (
                        <SwiperSlide key={index} className="h-auto" >
                            <Card className="border-none shadow-apple p-10 hover-lift group h-full">
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
                        </SwiperSlide>
                    ))}
                    
                </Swiper>
            </div>
        </section>
    );
};
