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

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "AK Travels API Running 🚖",
  });
});



app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1", uploadRoutes);
app.use("/api/v1/settings", settingsRoutes);
app.use("/api/v1/contact", contactRoutes);

app.use(errorHandler);

export default app;