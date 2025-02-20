'use client';

import type { TicketSearchResultType } from '@/lib/queries/getTicketSearchResult';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from '@tanstack/react-table';

import { CircleCheckIcon, CircleXIcon } from 'lucide-react';

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
    data: TicketSearchResultType;
};

type RowType = TicketSearchResultType[0];

export default function TicketTable({ data }: Props) {
    const router = useRouter();

    const columnHeadersArray: Array<keyof RowType> = [
        'ticketDate',
        'title',
        'tech',
        'firstName',
        'lastName',
        'email',
        'completed',
    ];

    const columnHelper = createColumnHelper<TicketSearchResultType>();

    const columns = columnHeadersArray.map((columnName) => {
        return columnHelper.accessor(
            (row) => {
                // transformational date
                const value = row[columnName];
                if (columnName === 'ticketDate' && value instanceof Date) {
                    return value.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    });
                }
                if (columnName === 'completed') {
                    return value ? 'COMPLETED' : 'OPEN';
                }
                return value;
            },
            {
                id: columnName,
                header: columnName[0].toUpperCase() + columnName.slice(1),
                cell: ({ getValue }) => {
                    //presentational
                    const value = getValue();
                    if (columnName === 'completed') {
                        return (
                            <div className="grid place-content-center">
                                {value === 'OPEN' ? (
                                    <CircleXIcon className="opacity-25" />
                                ) : (
                                    <CircleCheckIcon className="text-green-600" />
                                )}
                            </div>
                        );
                    }
                    return value;
                },
            }
        );
    });

    const table = useReactTable({
        data,
        columns,
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
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
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
                            onClick={() =>
                                router.push(
                                    `/tickets/form?ticketId=${row.original.id}`
                                )
                            }
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="Border">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between items-center">
                <div className="flex basic-1/3 items-center">
                    <p className="whitespace-nowrap font-bold">
                        {`Page ${
                            table.getState().pagination.pageIndex + 1
                        } of ${table.getPageCount()}`}
                        &nbsp;&nbps;
                    </p>
                </div>
            </div>
        </div>
    );
}
