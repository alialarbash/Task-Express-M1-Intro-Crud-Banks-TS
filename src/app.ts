import express from "express";
import bankRoutes from "./api/banks/banks.routes";
const app = express();

app.use(express.json());
app.use("/api/banks", bankRoutes);

if (require.main === module) {
  app.listen(8080, () => {
    console.log("the server has started at localhost:8080");
  });
}

export default app;
