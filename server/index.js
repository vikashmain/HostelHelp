import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import { fail } from "./utils/response.js";

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors({ origin: (process.env.FRONTEND_URL || "http://localhost:5173").split(",") }));
app.use(express.json({ limit: "1mb" }));
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use(routes);
app.use((error, _req, res, _next) => {
  console.error(error);
  fail(res, 500, "Something went wrong. Please try again.");
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hosteldesk")
  .then(() => app.listen(port, () => console.log(`HostelDesk API listening on ${port}`)))
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
