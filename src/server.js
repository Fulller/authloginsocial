import express from "express";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import "./config/passport.js";
import passport from "passport";
import cors from "cors";
import authRoute from "./routes/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cookieSession({
    name: "sesstion",
    keys: ["copper"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log("Server is runing on PORT " + PORT);
});
