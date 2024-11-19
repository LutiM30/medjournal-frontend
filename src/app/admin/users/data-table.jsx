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
import DialogueBoxButton from '@/components/DialogueBoxButton';
import UserActionsApiCall, {
  USER_ACTIONS,
} from '@/lib/functions/UserActionsApiCall';
import { upperize } from 'radash';
import PaginationControls from '@/components/PaginationControls';

const DataTable = ({
  data = [],
  currentPage,
  hasNextPage = false,
  setSearch,
  search,
  setCurrentPage,
  trigger,
}) => {
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [placeholders, setPlaceholders] = useState([
    'Search',
    'Search John Doe...',
    'Search Hello World',
    'Search Tyler Durden',
  ]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    rowCount: 10,
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

        placeholdersArr.push(getSearchStr(capitalize(obj[`displayName`])));
        placeholdersArr.push(getSearchStr(roleStr));
      });

      setPlaceholders([...new Set(placeholdersArr)]);
    }
  }, [data]);

  const VanishInputProps = {
    placeholders,
    onChange: () => {},
    onSubmit: (e) => {
      setSearch([...search, e.target[0].value]);
      setCurrentPage(0);
    },
    search,
    setSearch,
    setCurrentPage,
  };

  const actionUsers = async (uid, action) => {
    const actionUsersAPICall = async (ids = []) => {
      const idsArray = Array.isArray(ids) ? ids : [ids];
      return await UserActionsApiCall(idsArray, action);
    };

    if (uid) {
      try {
        await actionUsersAPICall(uid);
        trigger();
      } catch (error) {
        console.error(`ERROR WHILE ${upperize(action)} User: `, error);
      }
    } else {
      const selectedRowsIDs = table
        .getSelectedRowModel()
        .rows?.map((row) => row.original?.uid);

      table.resetRowSelection();
      try {
        await actionUsersAPICall(selectedRowsIDs);
        trigger();
      } catch (error) {
        console.error(`ERROR WHILE ${upperize(action)} User: `, error);
      }
    }
  };

  return (
    <>
      <div className='flex items-center justify-between py-4'>
        <VanishInput {...VanishInputProps} />
      </div>
      {data?.length ? (
        <>
          <div className='border rounded-md'>
            <Table pagination={!search?.length}>
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
            {Object?.keys(rowSelection)?.length ? (
              <div className={'mx-1'}>
                <DialogueBoxButton
                  dialogueDescription=''
                  dialogueTitle=''
                  dialogueNo='No'
                  dialogueYes='Yes, Delete'
                  dialogueYesAction={(uid) =>
                    actionUsers(uid || '', USER_ACTIONS.delete)
                  }
                  triggerTitle='Delete'
                  triggerVariant='destructive'
                />

                <DialogueBoxButton
                  dialogueDescription='Do you really want to disable the user account ?'
                  dialogueTitle=''
                  dialogueNo='No'
                  dialogueYes='Yes, Disable'
                  dialogueYesAction={(uid) =>
                    actionUsers(uid || '', USER_ACTIONS.disable)
                  }
                  triggerTitle='Disable'
                  triggerVariant='warning'
                />

                <DialogueBoxButton
                  dialogueDescription='Do you really want to verify the user account ?'
                  dialogueTitle=''
                  dialogueNo='No'
                  dialogueYes='Yes'
                  dialogueYesAction={(uid) =>
                    actionUsers(uid || '', USER_ACTIONS.verify)
                  }
                  triggerTitle='Verify'
                  triggerVariant='positive'
                />
              </div>
            ) : (
              <></>
            )}
            <PaginationControls
              hasNextPage={hasNextPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <div className='py-4 text-center'>
          Unable to load users data. Please try again later.
        </div>
      )}
    </>
  );
};

export default DataTable;
