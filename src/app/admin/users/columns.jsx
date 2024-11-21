import React from 'react';
import { ADMIN_ROLE, DATE_SHOWING_FORMAT, SAMPLE_NAME } from '@/lib/constants';
import dayjs from 'dayjs';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ellipsis } from 'lucide-react';

const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select All'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'uid', // Changed from 'id' to 'uid' to match your data structure
    header: 'ID',
    cell: ({ row }) => (
      <div>
        {row?.original?.role && row?.original?.role !== ADMIN_ROLE
          ? row.original?.profile
            ? row.original?.profile[`${row?.original?.role}_id`]
            : row.original.uid
          : row.original.uid}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'displayName',
    header: 'Name',
    cell: ({ row }) => (
      <div className='capitalize'>
        {row.original.displayName || SAMPLE_NAME}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => (
      <div>{dayjs(row.original.createdAt).format(DATE_SHOWING_FORMAT)}</div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => <div className='capitalize'>{row.original.role}</div>,
  },
  {
    accessorKey: 'isProfileComplete',
    header: 'Profile Completed',
    cell: ({ row }) =>
      row.original.profile?.isProfileComplete ? (
        <Badge variant='default'>Yes</Badge>
      ) : (
        <Badge variant='destructive'>No</Badge>
      ),
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => (
      <Button variant='ghost' size='icon'>
        <Ellipsis />
      </Button>
    ),
  },
];

export default columns;
