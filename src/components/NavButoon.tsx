import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

type Props = {
    icon: LucideIcon;
    label: string;
    href?: string;
};

export function NavButton({ icon: Icon, label, href }: Props) {
    return (
        <Button
            variant="ghost"
            size="icon"
            aria-label={label}
            title={label}
            asChild
        >
            {href ? (
                <Link href={href}>
                    <Icon />
                </Link>
            ) : (
                <Icon />
            )}
        </Button>
    );
}
