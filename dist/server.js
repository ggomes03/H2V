"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const routes_1 = __importDefault(require("./routes"));
const server = async () => {
    try {
        // Carregar as rotas antes de iniciar o servidor
        await (0, routes_1.default)(app_1.default);
        await app_1.default.listen({
            port: 3000,
            host: '0.0.0.0'
        });
        console.log("servidor rodando em http://localhost:3000");
    }
    catch (err) {
        app_1.default.log.error(err);
        process.exit(1);
    }
};
server();
