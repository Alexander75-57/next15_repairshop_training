import { Column } from '@tanstack/react-table';
import DebouncedInput from '@/components/react-table/DebouncedInput';

type Props<T> = {
    Column: Column<T, unknown>;
};

export default function Filter<T>({ Column }: Props<T>) {}
