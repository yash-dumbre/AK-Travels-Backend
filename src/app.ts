import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";
import vehicleRoutes from "./routes/vehicle.routes";
import bookingRoutes from "./routes/booking.routes";
import uploadRoutes from "./routes/upload.routes";
import settingsRoutes from "./routes/companySetting.routes";
import contactRoutes from "./routes/contact.routes";
// ...

// ...


const app = express();



app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "AK Travels API Running 🚖",
  });
});



const allowedOrigins = [
  "http://localhost:3000",
  "https://ak-travels-frontend.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));



app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1", uploadRoutes);
app.use("/api/v1/settings", settingsRoutes);
app.use("/api/v1/contact", contactRoutes);

app.use(errorHandler);

export default app;