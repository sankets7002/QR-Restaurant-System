import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

export default app;
