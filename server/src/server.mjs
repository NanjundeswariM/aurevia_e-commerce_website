import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.mjs";
import productRoutes from "./routes/productRoutes.mjs";
import orderRoutes from "./routes/orderRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import passport, { configurePassport } from "./config/passport.mjs";

dotenv.config();
const app = express();
app.use(express.json());
const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL
].filter(Boolean);
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true
    })
);
configurePassport();
app.use(passport.initialize());
app.get("/", (req, res) => {
    res.send("Welcome to Aurevia Backend!");
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();