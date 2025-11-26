import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bankRoutes from "./api/banks/banks.routes";
import connectDB from "./database";
const app = express();

app.use(express.json());
app.use("/api/banks", bankRoutes);

connectDB();

if (require.main === module) {
  app.listen(process.env.PORT || 8000, () => {
    console.log(
      `the server has started at localhost:${process.env.PORT || 8000}`
    );
  });
}

export default app;
