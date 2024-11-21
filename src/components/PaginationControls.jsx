import React from 'react';
import { Button } from './ui/button';
import { useAtomValue } from 'jotai';
import { isLoadingAtom } from '@/lib/atoms/atoms';

const PaginationControls = ({ hasNextPage, currentPage, setCurrentPage }) => {
  const isLoading = useAtomValue(isLoadingAtom);
  const handleNextPage = () =>
    hasNextPage ? setCurrentPage((prev) => prev + 1) : null;

  const handlePreviousPage = () =>
    currentPage > 0 ? setCurrentPage((prev) => prev - 1) : null;

  return (
    <div className='flex space-x-2'>
      <Button
        variant='outline'
        onClick={handlePreviousPage}
        disabled={currentPage === 0 || isLoading}
        className='px-4'
      >
        Previous
      </Button>

      <Button
        variant='outline'
        onClick={handleNextPage}
        disabled={!hasNextPage || isLoading}
        className='px-4'
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
