import { parentPort } from "worker_threads";

let counter = 0;

for (let i = 0; i < 200_000_000; i++) {
  counter++;
}
if (parentPort) {
  parentPort.postMessage(counter);
}
