import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

async function StartServer() {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("connected to db");
    server = app.listen(envVars.PORT, () => {
      console.log("Server listening on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
}

(async ()=>{
  await StartServer();
  await seedSuperAdmin();
})()

// Unhandled rejection error
// if a promise nt handle with try catch

process.on("unhandledRejection", (error) => {
  console.log(
    "Unhandled Rejection Detected......, Server Shutting Down!!!!",
    error
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// Promise.reject(new Error("Forgate to handled Rejection"))



// Uncaught Exception:- errors except promise, those are not handled
process.on("uncaughtException", (error) => {
  console.log(
    "Uncaught Exception Detected......, Server Shutting Down!!!!", error
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// throw new Error("Uncaught Exception Rise");

// SIGNAL TERMINATION - SIGTERM
process.on("SIGTERM", () => {
  console.log(
    "Signal Termination Recived......, Server Shutting Down!!!!"
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});