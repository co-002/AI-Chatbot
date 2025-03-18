import express from "express";
import dotent from "dotenv";
import cors from "cors";
import dbConnection from "./DB_connection.js";
import userRouter from "./routes/user.js";
import scriptRouter from "./routes/script.js"
import cookieParser from "cookie-parser";

dbConnection();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotent.config();
const port = process.env.PORT || 3000;

// User Router
app.use("/api/user", userRouter);

app.use("/api/script", scriptRouter)

app.listen(port, () => {
  console.log("Server is running");
});
