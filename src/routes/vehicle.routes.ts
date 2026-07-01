import { Router } from "express";
import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  deleteVehicle,
  updateVehicle,
} from "../controllers/vehicle.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Public
router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);

// Protected (CLEAN JSON ONLY)
router.post("/", authenticate, createVehicle);

router.put("/:id", authenticate, updateVehicle);

router.delete("/:id", authenticate, deleteVehicle);

export default router;