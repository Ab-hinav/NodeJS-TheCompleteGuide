"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
let counter = 0;
for (let i = 0; i < 200000000; i++) {
    counter++;
}
if (worker_threads_1.parentPort) {
    worker_threads_1.parentPort.postMessage(counter);
}
