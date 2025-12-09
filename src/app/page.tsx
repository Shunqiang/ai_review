import { Header } from "@/components/header";
import { StatCard } from "@/components/stat-card";
import { UsageTrendChart } from "@/components/usage-trend-chart";
import { CoverageChart } from "@/components/coverage-chart";
import { IssueAnalysisChart } from "@/components/issue-analysis-chart";
import { FeedbackList } from "@/components/feedback-list";
import { Button } from "@/components/ui/button";
import { Filter, Calendar, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display">
      <Header />
      <main className="layout-container flex h-full grow flex-col">
        <div className="px-4 sm:px-6 lg:px-10 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-7xl flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 py-3">
              <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-left">仪表盘</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  筛选
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  过去30天
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  生成报告
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              <StatCard title="活跃用户（季度）" value="1,204" change="+12%" isPositive={true} />
              <StatCard title="AI审查总运行次数" value="25,831" change="+8.5%" isPositive={true} />
              <StatCard title="预估节省人日" value="312" change="-2.1%" isPositive={false} />
              <StatCard title="检测到的严重问题" value="487" change="-5%" isPositive={false} />
            </div>
            <div className="p-4">
              <Card>
                <CardHeader>
                  <CardTitle>使用趋势</CardTitle>
                  <p className="text-slate-500 dark:text-[#92adc9]">每月活跃用户数与审查运行次数</p>
                </CardHeader>
                <CardContent>
                  <UsageTrendChart />
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 py-6">
              <Card>
                <CardHeader>
                  <CardTitle>代码审查覆盖率</CardTitle>
                  <p className="text-slate-500 dark:text-[#92adc9]">按模块划分</p>
                </CardHeader>
                <CardContent>
                  <CoverageChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>问题分析 (有效性与误报)</CardTitle>
                  <p className="text-slate-500 dark:text-[#92adc9]">按类型和状态划分</p>
                </CardHeader>
                <CardContent>
                  <IssueAnalysisChart />
                </CardContent>
              </Card>
            </div>
            <div className="p-4">
              <FeedbackList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}