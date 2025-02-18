import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

export const actionClient = createSafeActionClient({
    defineMetadataSchema() {
        return z.object({
            actionName: z.string(),
        });
    },
    handleServerError(e, utils) {
        //console.log(e.constructor.name); for test error - NeonDbError

        // below data for check error and send to like Sentry
        //const { clientInput, metadata } = utils;
        // console.log('server error: ', e);
        // console.log('client input: ', clientInput);
        // console.log('metadata: ', metadata?.actionName);

        //befar ws  if (e.constructor.name === 'DatbaseError')
        if (e.constructor.name === 'NeonDbError') {
            return 'Datbase Error: Your data did not save. Support will be notified.';
        } else {
            return e.message;
        }
    },
});
