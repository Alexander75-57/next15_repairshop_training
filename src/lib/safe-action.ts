import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

import type { NeonDbError } from '@neondatabase/serverless';

export const actionClient = createSafeActionClient({
    defineMetadataSchema() {
        return z.object({
            actionName: z.string(),
        });
    },
    handleServerError(e, utils) {
        if (e.constructor.name === 'NeonDbError') {
            const { code, detail } = e as NeonDbError;
            if (code === '23505') {
                //'23505' - код повторяющая unique data;
                return `Unique entry requared. ${detail}`;
            } else {
                return `Database Error: Your data did not save. ${detail}`;
            }
        } else {
            return e.message;
        }

        //console.log(e.constructor.name); for test error - NeonDbError

        // below data for check error and send to like Sentry
        //const { clientInput, metadata } = utils;
        // console.log('server error: ', e);
        // console.log('client input: ', clientInput);
        // console.log('metadata: ', metadata?.actionName);

        //befar ws  if (e.constructor.name === 'DatbaseError')
    },
});
