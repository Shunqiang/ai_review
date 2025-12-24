import React from 'react';
import { ThumbsUp, Copy } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/card';

const feedback = [
  {
    id: 1,
    user: 'Jane Doe',
    pr: '#1245',
    comment: '“这个关于重构状态管理逻辑的建议改变了游戏规则。为我节省了数小时！”',
    reaction: 'liked',
    time: '2小时前'
  },
  {
    id: 2,
    user: 'John Smith',
    pr: '#1242',
    comment: '“建议的单元测试用例非常周全，我直接复制了。”',
    reaction: 'copied',
    time: '5小时前'
  }
];

export const FeedbackList = () => {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
        <div className="flex border-b border-border px-6">
            <button className="px-4 py-4 text-sm font-medium text-primary border-b-2 border-primary">开发者反馈</button>
            <button className="px-4 py-4 text-sm font-medium text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-border transition-colors">缺陷热点</button>
            <button className="px-4 py-4 text-sm font-medium text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-border transition-colors">常见问题</button>
        </div>
        
        <div className="p-6">
             <ul className="space-y-4">
                {feedback.map((item) => (
                    <li key={item.id} className="group flex flex-col sm:flex-row items-start gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors border border-transparent hover:border-border">
                        <img 
                            alt={item.user} 
                            className="size-10 rounded-full object-cover ring-2 ring-background" 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.user.replace(' ', '')}`}
                        />
                        <div className="flex-1">
                            <p className="text-sm text-foreground leading-relaxed">
                                <span className="text-primary font-medium">@{item.user.replace(' ', '')}</span>: {item.comment}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] font-medium bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">PR {item.pr}</span>
                                <span className="text-[10px] text-muted-foreground">{item.time}</span>
                            </div>
                        </div>
                        {item.reaction === 'liked' ? (
                            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full self-start">
                                <ThumbsUp className="size-4 fill-emerald-600 dark:fill-emerald-400" />
                                <span className="text-xs font-bold">已点赞</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full self-start">
                                <Copy className="size-4 fill-blue-600 dark:fill-blue-400" />
                                <span className="text-xs font-bold">已采纳</span>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
};
