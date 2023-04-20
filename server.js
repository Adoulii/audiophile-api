import { connect } from "./src/config/DbConnection.js";
import express from "express";
import productRoutes from "./src/Routes/productsRoute.js";
import authRouter from "./src/Routes/authRoute.js"
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 5000;
app.use(
  cors({
    origin: [ "http://localhost:3000"],
    // credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api", productRoutes);
app.use("/api", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
connect();
