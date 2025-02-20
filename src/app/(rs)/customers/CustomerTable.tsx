'use client';

import type { selectCustomerSchemaType } from '@/zod-schema/customer';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { useRouter } from 'next/navigation';

type Props = {
    data: selectCustomerSchemaType[];
};

export default function CustomerTable({ data }: Props) {
    const router = useRouter();

    const columnHeadersArray: Array<keyof selectCustomerSchemaType> = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'city',
        'zip',
    ];

    const columnHelper = createColumnHelper<selectCustomerSchemaType>();

    const columns = columnHeadersArray.map((columnName) => {
        return columnHelper.accessor(columnName, {
            id: columnName,
            header: columnName[0].toUpperCase + columnName.slice(1),
        });
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="mt-6 rounded-lg overflow-hidden  border-border">
            <Table className="border">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        className="bg-secondary"
                                    >
                                        <div>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </div>
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody></TableBody>
            </Table>
        </div>
    );
}
