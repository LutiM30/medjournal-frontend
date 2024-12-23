'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { Cross1Icon, Cross2Icon } from '@radix-ui/react-icons';
import { TooltipArrow } from '@radix-ui/react-tooltip';

/**
 * A sophisticated input component that features animated placeholders and a vanishing text effect.
 * When text is submitted, it disintegrates into particles that animate outward before disappearing.
 * The component also cycles through a list of placeholder texts with smooth transitions.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string[]} props.placeholders - Array of placeholder strings to cycle through.
 *                                       Each placeholder will be displayed for 3 seconds before transitioning to the next.
 * @param {Function} [props.onChange] - Optional callback function that fires when the input value changes.
 *                                     Receives the input change event as an argument.
 * @param {Function} [props.onSubmit] - Optional callback function that fires when the form is submitted.
 *                                     Receives the form submit event as an argument.
 *
 * @example
 * // Basic usage with placeholders
 * <PlaceholdersAndVanishInput
 *   placeholders={["Type something...", "Enter text here...", "What's on your mind?"]}
 *   onChange={(e) => console.log('Input changed:', e.target.value)}
 *   onSubmit={(e) => {
 *     e.preventDefault();
 *     console.log('Form submitted!');
 *   }}
 * />
 *
 * @returns {JSX.Element} A form containing an animated input field with a submit button
 *
 * @remarks
 * Features:
 * - Automatically cycles through placeholder texts every 3 seconds
 * - Pauses placeholder animation when tab is not visible (uses visibilitychange API)
 * - Supports dark mode through dark: tailwind classes
 * - Includes a canvas-based particle animation effect when text is submitted
 * - Responsive design with different text sizes for mobile/desktop
 * - Animated submit button that reveals itself when input has value
 *
 * Technical Implementation:
 * - Uses HTML5 Canvas API for particle effects
 * - Implements Framer Motion for smooth animations
 * - Uses RAF (requestAnimationFrame) for smooth particle animations
 * - Handles cleanup of intervals and event listeners in useEffect
 * - Maintains responsive canvas scaling using CSS transform
 *
 * Styling:
 * - Uses Tailwind CSS for styling
 * - Supports both light and dark themes
 * - Uses shadcn/ui design principles
 * - Includes hover and focus states
 * - Maintains accessible contrast ratios
 *
 * @see Related components: none
 * @version 1.0.0
 */

export default function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
  className,
  setSearch,
  search,
  setCurrentPage,
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [crossIcon, setCrossIcon] = useState(false);

  const intervalRef = useRef(null);
  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState !== 'visible' && intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
      intervalRef.current = null;
    } else if (document.visibilityState === 'visible') {
      startAnimation(); // Restart the interval when the tab becomes visible
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [placeholders]);

  const canvasRef = useRef(null);
  const newDataRef = useRef([]);
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue('font-size'));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = '#FFF';
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData = [];

    for (let t = 0; t < 800; t++) {
      let i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        let e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start) => {
    const animateFrame = (pos = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setValue('');
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !animating) {
      vanishAndSubmit();
    }
  };

  const vanishAndSubmit = () => {
    setAnimating(true);
    draw();

    const value = inputRef.current?.value || '';
    if (value && inputRef.current) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    vanishAndSubmit();
    onSubmit && onSubmit(e);
  };
  return (
    <div className='flex flex-col items-center justify-center text-center  mx-auto '>
      <form
        className={cn(
          'w-full relative max-w-sm mx-auto bg-white dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200',
          value && 'bg-gray-50',
          className
        )}
        onSubmit={handleSubmit}
      >
        <canvas
          className={cn(
            'absolute pointer-events-none  text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20',
            !animating ? 'opacity-0' : 'opacity-100'
          )}
          ref={canvasRef}
        />
        <input
          onChange={(e) => {
            if (!animating) {
              setValue(e.target.value);
              onChange && onChange(e);
            }
          }}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={value}
          type='text'
          className={cn(
            'w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20',
            animating && 'text-transparent dark:text-transparent'
          )}
        />
        <button
          disabled={!value}
          type='submit'
          className='absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center'
        >
          <motion.svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='text-gray-300 h-4 w-4'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <motion.path
              d='M5 12l14 0'
              initial={{
                strokeDasharray: '50%',
                strokeDashoffset: '50%',
              }}
              animate={{
                strokeDashoffset: value ? 0 : '50%',
              }}
              transition={{
                duration: 0.3,
                ease: 'linear',
              }}
            />
            <path d='M13 18l6 -6' />
            <path d='M13 6l6 6' />
          </motion.svg>
        </button>
        <div className='absolute inset-0 flex items-center rounded-full pointer-events-none'>
          <AnimatePresence mode='wait'>
            {!value && (
              <motion.p
                initial={{
                  y: 5,
                  opacity: 0,
                }}
                key={`current-placeholder-${currentPlaceholder}`}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -15,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'linear',
                }}
                className='dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate'
              >
                {placeholders[currentPlaceholder]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
      {search.length ? (
        <div className='flex justify-center flex-wrap mt-2 min-h-[2rem]'>
          {search.map((term) => (
            <TooltipProvider key={term}>
              <Tooltip onOpenChange={(changeOpen) => setCrossIcon(changeOpen)}>
                <TooltipTrigger>
                  <Badge
                    onClick={() => {
                      setSearch((search) =>
                        search?.filter((inArr) => term !== inArr)
                      );
                      setCurrentPage(0);
                    }}
                    className={cn(
                      'mx-1',
                      'text-sm',
                      'relative inline-flex h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'
                    )}
                    variant='outline'
                  >
                    <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                    <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 text-sm font-medium text-white backdrop-blur-3xl'>
                      {term}{' '}
                      {crossIcon && (
                        <Cross2Icon
                          className={cn(
                            'ml-1',
                            'transition-opacity',
                            'duration-700',
                            'ease-in-out',
                            'animate-in slide-in-from-left',
                            'fade-in'
                          )}
                          fontSize={10}
                        />
                      )}
                    </span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side='bottom'>Click to Remove</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
