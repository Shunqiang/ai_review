"use client";

import React from 'react';
import { ConfigProvider } from '@ant-design/charts';
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { AdoptionTrends } from "@/components/adoption-trends";
import { TacticalView } from "@/components/tactical-view";
import { StrategicView } from "@/components/strategic-view";
import { GovernanceView } from "@/components/governance-view";
import { FeedbackSection } from "@/components/feedback-section";

import { KeyMetrics } from "@/components/key-metrics";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-primary/10">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 pl-20 transition-all duration-300">
        <Header />
        
        <main className="flex-1 w-full max-w-[1600px] mx-auto">
          <ConfigProvider
          common={{
            theme: {
              type: 'light',
            }
          }}
          >
          <div className="p-8 lg:p-16 space-y-12 pb-32">
            <KeyMetrics />
            <AdoptionTrends />
            <TacticalView />
            <StrategicView />
            <GovernanceView />
            <FeedbackSection />
            
            <footer className="pt-24 pb-12 border-t border-border/10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-label opacity-40">
                <p>© 2025 AI Engineering Systems. All rights reserved.</p>
                <div className="flex gap-8">
                  <a href="#" className="hover:text-primary transition-colors">Documentation</a>
                  <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-primary transition-colors">Support</a>
                </div>
              </div>
            </footer>
          </div>
          </ConfigProvider>
        </main>
      </div>
    </div>
  );
}