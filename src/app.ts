import cors from "cors";
import express, { Application } from "express";
import Stripe from "stripe";
import config from "./app/config";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();
const port = 3000;
export const stripe = new Stripe(config.stripe_sk ?? "");

// Use CORS with the specific origin and allow credentials
app.use(
  cors({
    origin: ["http://localhost:5173"], // Specify the origin
    credentials: false, // Allow credentials
  })
);

app.use(express.json());
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Welcome to Sport Goods Backend!");
});

app.use(notFound);

export default app;
