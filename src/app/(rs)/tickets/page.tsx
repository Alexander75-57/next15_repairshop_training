import TicketSearch from '@/app/(rs)/tickets/TicketSearch';

import { getOpenTickets } from '@/lib/queries/getOpenTickets';
import { getTicketSearchResult } from '@/lib/queries/getTicketSearchResult';

import TicketTable from '@/app/(rs)/tickets/TicketTable';

export const metadata = {
    title: 'Tickets Search',
};

export default async function Tickets({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    /* return <h2>Tickets Page</h2>; */ //for test empty page
    const { searchText } = await searchParams;

    //query default results
    if (!searchText) {
        const results = await getOpenTickets();
        return (
            <>
                <TicketSearch />
                {/* <p>{JSON.stringify(results)}</p> */}
                {results.length ? <TicketTable data={results} /> : null}
            </>
        );
    }
    //query search results
    const results = await getTicketSearchResult(searchText);
    //return search results
    return (
        <>
            <TicketSearch />
            {/* <p>{JSON.stringify(results)}</p> */}
            {results.length ? <TicketTable data={results} /> : null}
        </>
    );
}
