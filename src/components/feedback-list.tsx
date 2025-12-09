import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThumbsUp, Copy, User as UserIcon } from 'lucide-react';

const feedback = [
  {
    id: 1,
    user: 'Jane Doe',
    pr: '#1245',
    comment: '“这个关于重构状态管理逻辑的建议改变了游戏规则。为我节省了数小时！”',
    reaction: 'liked',
  },
  {
    id: 2,
    user: 'John Smith',
    pr: '#1242',
    comment: '“建议的单元测试用例非常周全，我直接复制了。”',
    reaction: 'copied',
  },
  {
    id: 3,
    user: 'Emily White',
    pr: '#1239',
    comment: '“最初持怀疑态度，但性能优化的建议非常到位。”',
    reaction: 'liked',
  },
];

export const FeedbackList = () => {
  return (
    <Card>
      <CardHeader>
        <Tabs defaultValue="feedback">
          <TabsList>
            <TabsTrigger value="feedback">开发者反馈</TabsTrigger>
            <TabsTrigger value="faq">常见问题</TabsTrigger>
            <TabsTrigger value="hotspots">缺陷热点</TabsTrigger>
          </TabsList>
          <TabsContent value="feedback">
            <CardTitle>近期反馈</CardTitle>
            <ul className="space-y-4 mt-4">
              {feedback.map((item) => (
                <li key={item.id} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-[#233648]/50">
                  <Avatar>
                    <AvatarFallback><UserIcon /></AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.comment}</p>
                    <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {item.user} 于 PR {item.pr}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.reaction === 'liked' && <ThumbsUp className="h-4 w-4 text-green-500" />}
                    {item.reaction === 'copied' && <Copy className="h-4 w-4 text-blue-500" />}
                    <span className="text-sm font-bold">
                      {item.reaction === 'liked' ? '已点赞' : '已复制'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
};
