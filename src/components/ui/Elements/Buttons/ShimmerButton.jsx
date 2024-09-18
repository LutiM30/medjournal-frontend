import React from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const ShimmerButton = React.forwardRef(({ className, ...props }, ref) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const buttonClasses = cn(
    'inline-flex text-sm h-12 animate-shimmer items-center justify-center',
    'border rounded-full px-6 font-medium transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'bg-[length:200%_100%]',
    'border-slate-800 text-slate-800',
    'bg-[linear-gradient(110deg,#f5f5f5,45%,#ffffff,55%,#f5f5f5)]',
    'focus:ring-slate-800 focus:ring-offset-white',
    'dark:border-white/[0.2] dark:text-white',
    'dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]',
    'dark:focus:ring-white dark:focus:ring-offset-gray-900',
    mounted && resolvedTheme === 'dark' ? 'dark' : '',
    className
  );

  return <button ref={ref} className={buttonClasses} {...props} />;
});

ShimmerButton.displayName = 'ShimmerButton';

export default ShimmerButton;
