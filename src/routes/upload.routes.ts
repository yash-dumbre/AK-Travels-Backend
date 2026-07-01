import { Router } from "express";
import  upload  from "../middleware/upload.middleware";
import { uploadImage } from "../controllers/upload.controller";

const router = Router();

router.post(
  "/upload",
  upload.single("file"),
  uploadImage
);

export default router;