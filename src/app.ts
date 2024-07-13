import cors from "cors";
import express, { Application } from "express";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();
const port = 3000;
app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors());
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Welcome to Sport Goods Backend!");
});

app.use(notFound);

export default app;
