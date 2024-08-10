import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

import { authMiddleware } from "./src/features/auth/auth.middleware";
import { AuthRouter } from "./src/features/auth/auth.controller";
import { UserRouter } from "./src/features/user/user.controller";
import { ReviewRouter } from "./src/features/review/review.controller";

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_DB_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then((res) => console.log(`MongoDB Connected: ${res.connection.host}`))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", authMiddleware, UserRouter);
app.use("/api/v1/reviews", ReviewRouter);

app.use(
  "/assets/uploads",
  express.static(path.join(__dirname, "assets/uploads"))
);
// app.use(express.static(path.join(__dirname, "public")));
app.use("/", (_, res) => res.send(`<h1>Server running on port ${PORT}</h1>`));
