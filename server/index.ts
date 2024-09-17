import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";
import { responseHandler } from "./middlewares";
import {
  approvalRoutes,
  authRoutes,
  baseRoutes,
  layoutRoutes,
  leadRoutes,
  siteRoutes,
  tokenRoutes,
  contactRoutes,
  apartmentRoutes,
  blockRoutes,
  flatRoutes,
} from "./routes";

dotenv.config();
const app: Express = express();
const port: string = process.env.PORT as string | "4000";

// middlewares
app.use(cors());
app.use(express.json());
app.use(responseHandler);

// routes
app.use("/auth", authRoutes);
app.use("/layouts", layoutRoutes);
app.use("/sites", siteRoutes);
app.use("/leads", leadRoutes);
app.use("/token", tokenRoutes);
app.use("/approvals", approvalRoutes);
app.use("/apartments", apartmentRoutes);
app.use("/blocks", blockRoutes);
app.use("/flats", flatRoutes);
app.use("/contacts", contactRoutes);
app.use("/", baseRoutes);

mongoose
  .connect(process.env.MONGO_URI as string, {})
  .then(() => {
    app.listen(port, () => {
      console.log(`connected to DB, listening on ${port} ✅`);
    });
  })
  .catch((error) => {
    console.log("error ===", error);
  });
