/* export const metadata = {
    title: 'Home',
}; */

import { redirect } from 'next/navigation';

export default function Home() {
    /* return <h2>Home Page</h2>; */
    redirect('/tickets');
}
