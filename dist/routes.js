"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;
const firefly_sdk_1 = __importDefault(require("@hyperledger/firefly-sdk"));
const credencials_ff = {
    host: 'http://localhost:5000',
    namespace: 'default'
};
const firefly = new firefly_sdk_1.default(credencials_ff);
async function routes(app) {
    app.get('/', async (request, reply) => {
        const msg = "Inicial da API de TCC";
        reply.send(msg);
    });
    app.get('/identidades', async (request, reply) => {
        const msg = await firefly.getIdentities();
        reply.send(msg);
    });
}
