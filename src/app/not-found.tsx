/* 
import Link from 'next/link';

export default function NotFound() {
    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
        </div>
    );
} 
*/
// change to ---------------------

import Image from 'next/image';

export const metadata = {
    title: 'Page Not Found',
};

export default function NotFound() {
    return (
        <div className="px-2 w-full">
            <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
                <h2 className="text-2xl">Page Not Found</h2>
                <Image
                    className="m-0 rounded-xl"
                    src="/images/sad-computer-hi.png"
                    width={300}
                    height={300}
                    sizes="300px"
                    alt="Page Not Found"
                    priority={true}
                    title="Page Not Found"
                />
            </div>
        </div>
    );
}
