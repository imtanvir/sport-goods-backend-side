"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use((0, cors_1.default)());
app.use("/api/v1", routes_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Sport Goods Backend!");
});
app.use(notFound_1.default);
exports.default = app;
