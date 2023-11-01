"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const worker_threads_1 = require("worker_threads");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get("/non-blocking/", (req, res) => {
    res.status(200).send("This page is non-blocking");
});
//promisifying didnt work
function calResult() {
    return new Promise((resolve, reject) => {
        let counter = 0;
        for (let i = 0; i < 20000000000; i++) {
            counter++;
        }
        resolve(counter);
    });
}
app.get("/blocking", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   let ans = await calResult();
    const worker = new worker_threads_1.Worker("./workerThreadMig.js", {
        workerData: {
            path: "./workerThread.ts"
        }
    });
    worker.on("message", (data) => {
        res.status(200).send(`result is ${data}`);
    });
    worker.on("error", (msg) => {
        res.status(404).send(`An error occurred: ${msg}`);
    });
}));
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
