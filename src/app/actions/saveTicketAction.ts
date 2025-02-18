'use server';

import { eq } from 'drizzle-orm';
import { flattenValidationErrors } from 'next-safe-action';
import { redirect } from 'next/navigation';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { db } from '@/db';
import { tickets } from '@/db/schema';
import { actionClient } from '@/lib/safe-action';
import {
    insertTicketSchema,
    type insertTicketSchemaType,
} from '@/zod-schema/ticket';

export const saveTicketAction = actionClient
    .metadata({ actionName: 'saveTicketAction' })
    .schema(insertTicketSchema, {
        handleValidationErrorsShape: async (ve) =>
            flattenValidationErrors(ve).fieldErrors,
    })
    .action(
        async ({
            parsedInput: ticket,
        }: {
            parsedInput: insertTicketSchemaType;
        }) => {
            const { isAuthenticated } = getKindeServerSession();
            const auth = await isAuthenticated();
            if (!auth) redirect('/login');

            //New Ticket
            if (ticket.id === '(New)') {
                const result = await db
                    .insert(tickets)
                    .values({
                        customersid: ticket.customersid,
                        title: ticket.title,
                        description: ticket.description,
                        tech: ticket.tech,
                    })
                    .returning({ insertedId: tickets.id });

                return {
                    message: `Ticket ID #${result[0].insertedId} created successfully`,
                };
            }

            //Update Tickets
            const result = await db
                .update(tickets)
                .set({
                    customersid: ticket.customersid,
                    title: ticket.title,
                    description: ticket.description,
                    completed: ticket.completed,
                    tech: ticket.tech,
                })
                .where(eq(tickets.id, ticket.id!))
                .returning({ updatedId: tickets.id });
            return {
                message: `Ticket ID #${result[0].updatedId} updated successfully`,
            };
        }
    );
