import { Router } from "express";
import { createContact, getAllContacts } from "../controllers/contact.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", createContact);
router.get("/", authenticate, getAllContacts);

export default router;