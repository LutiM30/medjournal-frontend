import { cn } from '@/lib/utils';
import React from 'react';
import { MultiStepLoader } from './ui/multi-step-loader';
import { useAtomValue } from 'jotai';
import { isLoadingAtom } from '@/lib/atoms/atoms';

/**
 * A conditional wrapper component that displays a `MultiStepLoader` when loading is in progress
 * and a secondary condition is met, or renders its children within a styled container div otherwise.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be rendered when loading is complete.
 * @param {boolean} [props.anotherCondition=true] - A secondary condition that, together with the
 * loading state, determines if `MultiStepLoader` should render.
 * @param {string} [props.className] - Additional CSS classes to apply to the container div.
 *
 * @returns {React.ReactElement} Returns a `MultiStepLoader` if loading is active and
 * `anotherCondition` is `true`, otherwise renders `children` within a styled container div.
 *
 * @example
 * <AfterLoadingIsCompleted anotherCondition={isDataReady} className="custom-class">
 *   <YourComponent />
 * </AfterLoadingIsCompleted>
 */
const AfterLoadingIsCompleted = ({
  children,
  anotherCondition = true,
  className,
}) => {
  const isLoading = useAtomValue(isLoadingAtom);

  return isLoading && anotherCondition ? (
    <MultiStepLoader loading={isLoading} />
  ) : (
    <div className={cn('container p-4 mx-auto my-8', className)}>
      {children}
    </div>
  );
};

export default AfterLoadingIsCompleted;
