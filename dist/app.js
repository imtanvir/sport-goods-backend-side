"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("./app/config"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
const port = 3000;
exports.stripe = new stripe_1.default((_a = config_1.default.stripe_sk) !== null && _a !== void 0 ? _a : "");
// Use CORS with the specific origin and allow credentials
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"], // Specify the origin
    credentials: false, // Allow credentials
}));
app.use(express_1.default.json());
app.use("/api/v1", routes_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Sport Goods Backend!");
});
app.use(notFound_1.default);
exports.default = app;
