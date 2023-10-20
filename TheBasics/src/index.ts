import * as http from 'http';
import { reqHandler } from './routes';

//@ts-ignore
const server:http.Server  = http.createServer(reqHandler);

server.listen(3000);

import {server1}  from './Assignment/assignment'

server1.listen(3001);