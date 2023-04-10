import { connect } from "./config/DbConnection.js";
import express from "express";
import productRoutes from "./src/Routes/productsRoute.js";
import cors from "cors";

const app = express();
const PORT = 5000;
app.use(
  cors({
    origin: [ "http://localhost:3000"],
  })
);
app.use(express.json());
app.use("/api", productRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
connect();
