import { register } from 'ts-node';
register({ transpileOnly: true, esm: true });

import('./server.js').catch(err => {
    console.error('Error running the server:', err);
});
