'use client';
import React, { useEffect, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import columns from '@/app/admin/users/columns';
import { cn } from '@/lib/utils';
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { isLoadingAtom } from '@/lib/atoms/atoms';
import { useAtomValue } from 'jotai';
import VanishInput from '@/components/ui/placeholders-and-vanish-input';
import { ADMIN_ROLE } from '@/lib/constants';
import { capitalize } from 'radash';

const DataTable = ({
  data = [],
  handleNextPage,
  handlePreviousPage,
  currentPage,
  hasNextPage = false,
}) => {
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [placeholders, setPlaceholders] = useState([
    'Search',
    'Search John Doe...',
    'Search Hello World',
    'Search Tyler Durden',
  ]);
  const loading = useAtomValue(isLoadingAtom);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  /* This `useEffect` hook is responsible for updating the `placeholders` state based on the `data`
  prop whenever `data` changes. Here's a breakdown of what it does: */

  useEffect(() => {
    if (data && data?.length) {
      const placeholdersArr = [];
      data.forEach((obj) => {
        const profile = obj?.profile;
        /**
         * The function `getSearchStr` takes an optional string input and returns a formatted search
         * string.
         */
        const getSearchStr = (stringVar = '') => `Search ${stringVar}...`;
        const roleStr = capitalize(
          (!obj[`role`] ? '' : obj[`role`] === ADMIN_ROLE)
            ? 'Admin'
            : obj[`role`]
        );

        placeholdersArr.push(getSearchStr(obj[`displayName`]));
        placeholdersArr.push(roleStr);
      });

      setPlaceholders([...new Set(placeholdersArr)]);
    }
  }, [data]);

  const VanishInputProps = {
    placeholders,
    onChange: () => {},
    onSubmit: (e) => console.log(e.target[0].value),
  };

  return (
    <div className='w-full max-w-screen-xl p-4 mx-auto my-8 bg-white shadow-lg md:p-8 dark:bg-black rounded-xl'>
      <div className='flex items-center justify-between py-4'>
        <VanishInput {...VanishInputProps} />
      </div>
      <div className='border rounded-md'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between py-4'>
        <div className='text-sm text-gray-500 dark:text-gray-400'>
          Page {currentPage + 1}
        </div>

        <div className='flex space-x-2'>
          <Button
            variant='outline'
            onClick={handlePreviousPage}
            disabled={currentPage === 0 || loading}
            className='px-4'
          >
            Previous
          </Button>

          <Button
            variant='outline'
            onClick={handleNextPage}
            disabled={!hasNextPage || loading}
            className='px-4'
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
