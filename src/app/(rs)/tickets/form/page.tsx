import { getCustomer } from '@/lib/queries/getCustomer';
import { getTicket } from '@/lib/queries/getTicket';
import { BackButton } from '@/components/BackButton';
import TicketForm from '@/app/(rs)/tickets/form/ticketForm';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Users, init as kindeInit } from '@kinde/management-api-js';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId)
        return {
            title: 'Missing Ticket ID or Customer ID',
        };
    if (customerId)
        return {
            title: `New Ticket for Customer #${customerId}`,
        };

    if (ticketId)
        return {
            title: `Edit Ticket #${ticketId}`,
        };
}

export default async function TicketFormPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    try {
        const { customerId, ticketId } = await searchParams;
        if (!customerId && !ticketId) {
            return (
                <>
                    <h2 className="text-2xl mb-2">
                        Ticket ID or Customer ID required to load ticket form
                    </h2>
                    <BackButton title="Go Back" variant="default" />
                </>
            );
        }

        // Authrisation by Kind
        const { getPermission, getUser } = getKindeServerSession();
        const [managerPermission, user] = await Promise.all([
            getPermission('manager'),
            getUser(),
        ]);
        const isManager = managerPermission?.isGranted;

        //--New Ticket form ----
        if (customerId) {
            const customer = await getCustomer(parseInt(customerId));

            if (!customer) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">
                            Customer ID # {customerId} not found
                        </h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                );
            }
            if (!customer.active) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">
                            Customer ID # {customerId} is not active
                        </h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                );
            }
            //--return ticket form ---
            // console.log( customer);
            //return <TicketForm customer={customer} />;

            if (isManager) {
                kindeInit(); // Initilizes the Kinde Managment API
                const { users } = await Users.getUsers();

                const techs = users
                    ? users.map((user) => ({
                          id: user.email!,
                          description: user.email!,
                      }))
                    : [];
                return (
                    <TicketForm
                        customer={customer}
                        techs={techs}
                        isManager={isManager}
                    />
                );
            } else {
                return <TicketForm customer={customer} />;
            }
        }
        //--- Edit Ticket Form ----
        if (ticketId) {
            const ticket = await getTicket(parseInt(ticketId));

            if (!ticket) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">
                            Ticket ID # {ticketId} not found
                        </h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                );
            }

            const customer = await getCustomer(ticket.customersid);
            // return Ticket form ---
            // console.log('ticket: ', ticket);
            // console.log('customer: ', customer);
            //return <TicketForm customer={customer} ticket={ticket} />;
            if (isManager) {
                kindeInit(); // Initilizes the Kinde Managment API
                const { users } = await Users.getUsers();

                /* const techs = users
                    ? users.map((user) => ({
                          id: user.email?.toLowerCase()!,
                          description: user.email?.toLowerCase()!,
                      }))
                    : []; // change by GPT*/
                const techs = users
                    ? users.map((user) => {
                          const email = user.email?.toLowerCase();
                          return {
                              id: email || 'unknown',
                              description: email || 'unknown',
                          };
                      })
                    : [];
                return (
                    <TicketForm
                        customer={customer}
                        ticket={ticket}
                        techs={techs}
                        isManager={isManager}
                    />
                );
            } else {
                const isEditable =
                    user.email?.toLowerCase() === ticket.tech.toLowerCase();
                console.log('ue: ', user.email);
                console.log('tech:', ticket.tech);
                return (
                    <TicketForm
                        customer={customer}
                        ticket={ticket}
                        isEditable={isEditable}
                    />
                );
            }
        }
    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
    }
}
