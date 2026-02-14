import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";

connectDB();

const PORT = process.env.PORT || 5000;
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
