import CustomerSearch from '@/app/(rs)/customers/CustomerSearch';

import { getCustomerSearchResult } from '@/lib/queries/getCustomerSearchResult';

import CustomerTable from '@/app/(rs)/customers/CustomerTable';

export const metadata = {
    title: 'Customers Search',
};

export default async function Customers({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    /* return <h2>Customers Page</h2>; */
    const { searchText } = await searchParams;

    if (!searchText) return <CustomerSearch />;

    // query database
    const results = await getCustomerSearchResult(searchText);
    // return results
    return (
        <>
            <CustomerSearch />
            {/* <p>{JSON.stringify(results)}</p> // for test receive data from db whithiut form */}
            {results.length ? (
                <CustomerTable data={results} />
            ) : (
                <p className="mt-4">No result found</p>
            )}
        </>
    );
}
