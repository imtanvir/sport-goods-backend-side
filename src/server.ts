import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    // await mongoose.connect("mongodb://localhost:27017/");

    server = app.listen(config.port, () => {
      console.log(`Sport Goods Backend running on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log(`UnahandledRejection is detected , shutdown ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`UncaughtException is detected , shutdown ...`);
  process.exit(1);
});
