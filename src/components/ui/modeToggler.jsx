import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import Button from '@/components/ui/Elements/Buttons/ShimmerButton';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const changeTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  if (!mounted) {
    return null;
  }

  return (
    <Button onClick={changeTheme}>
      <SunIcon className='h-[1.2rem] w-[1.2rem] md:h-[1rem] md:w-[1.2rem] sm:h-[0.8rem] sm:w-[1rem] xs:h-[0.6rem] xs:w-[0.8rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] md:h-[1rem] md:w-[1rem] sm:h-[0.8rem] sm:w-[1rem] xs:h-[0.6rem] xs:w-[0.6rem]rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
