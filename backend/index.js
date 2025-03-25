import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import JobRoutes from "./routes/Job.js";
// import ImageRoutes from "./Temp/Image.js";
import test from "./routes/test.js";
const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connect to MongoDB successful!");
    })
    .catch((err) => {
      console.log(err);
    });
};

app.use(cors());
app.use(express.json());
app.use("/jobs", JobRoutes);
// app.use("/image", ImageRoutes);
app.use("/test", test);
// app.use("/fetch", fetchJson);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});
app.listen(7777, () => {
  connect();
  console.log("app is running in port 7777");
});
export default app;
