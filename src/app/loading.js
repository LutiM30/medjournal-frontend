import { MultiStepLoader } from '@/components/ui/multi-step-loader';
import { isLoadingAtom } from '@/lib/atoms/atoms';
import store from '@/lib/atoms/atomsStore';
import React from 'react';

const Loading = () => {
  
  const isLoading = store.get(isLoadingAtom);

  return <MultiStepLoader loading={isLoading} />;
};
export default Loading;
