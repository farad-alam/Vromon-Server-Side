import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

async function StartServer() {
  try {
    await mongoose.connect(
      "mongodb+srv://newsUser:jv3hCWn88nJ3FqC5@blogcluster.tzdrh.mongodb.net/Vromon_DB?retryWrites=true&w=majority&appName=BlogCluster"
    );
    console.log("connected to db");
    server = app.listen(5000, () => {
      console.log("Server listening on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
}

StartServer();

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