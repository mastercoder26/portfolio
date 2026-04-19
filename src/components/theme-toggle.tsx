'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span
        className={cn('inline-flex size-9 shrink-0 items-center justify-center', className)}
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'inline-flex size-9 shrink-0 items-center justify-center rounded-full',
        'text-current outline-none ring-offset-background transition-colors',
        'hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'dark:hover:bg-white/10',
        className
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="size-[1.125rem]" strokeWidth={2} />
      ) : (
        <Moon className="size-[1.125rem]" strokeWidth={2} />
      )}
    </button>
  );
}
