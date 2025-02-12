import { migrate } from 'drizzle-orm/neon-http/migrator';
import { db } from './index';

const main = async () => {
    try {
        console.log('Migration Start');
        await migrate(db, {
            migrationsFolder: 'src/db/migrations',
        });
        console.log('Migration complete');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

main();
