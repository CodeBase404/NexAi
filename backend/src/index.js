import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth.routes.js";
import connectToDb from "./config/db.js";
import rediClient from "./config/redis.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import chatRouter from "./routes/chat.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use("/user", authRouter);
app.use("/chat", chatRouter);

const startServer = async () => {
  try {
    await Promise.all([connectToDb(), rediClient.connect()]);
    console.log("✅ Database connected successfully");

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
};

startServer();
