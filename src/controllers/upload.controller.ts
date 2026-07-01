import { Request, Response } from "express";
import * as uploadService from "../services/upload.service";

export const uploadImage = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result: any =
      await uploadService.uploadToCloudinary(
        req.file.buffer
      );

    res.json({
      success: true,
      url: result.secure_url,
    });
  }catch (error: any) {
  console.log("CREATE VEHICLE ERROR");
  console.log(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};