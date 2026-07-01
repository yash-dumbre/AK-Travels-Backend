import { Router } from "express";
import * as settingsController from "../controllers/companySetting.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Public — navbar/sticky buttons read this
router.get("/", settingsController.getSettings);

// Admin only — updates require login
router.put("/", authenticate, settingsController.updateSettings);

export default router;