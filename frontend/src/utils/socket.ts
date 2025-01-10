import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_URL === 'production' ? undefined : 'http://localhost:3000';

export const socket = io(URL);