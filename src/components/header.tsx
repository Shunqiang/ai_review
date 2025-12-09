import React from 'react';
import { Bell, Moon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';

export const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-b-[#233648] px-10 py-3">
      <div className="flex items-center gap-4 text-slate-800 dark:text-white">
        <Logo />
        <h2 className="text-slate-800 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">AI代码审查</h2>
      </div>
      <div className="flex flex-1 justify-end items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Moon className="h-4 w-4" />
        </Button>
        <Avatar>
          <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvnP7Szbubm1JYb66fXPUv6chb8JGhxNDAFfAjttnZ7xBakc2nkhhxUvkR6XhlUOXe6SZqvNsR-I58qJjlYhIBR0H_GfkFRUUJ1Oy1ipH792GROuHO_XWF39ktUmAqi_AwQNm3WKlLQ0e4MyZb6XD3FooiLVT3X5EFrjmLMGHq7R7cj3UNByd13FtkHRjprR6-SGQKBeaF6i-bQdMyGC2bttHTvpR07sD0PoUgNfSZzE4bpkJIx2gJ4nGIY0CF_cR5YvldnDjAZ4O6" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};