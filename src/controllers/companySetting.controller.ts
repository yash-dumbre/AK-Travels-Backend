import { Request, Response } from "express";
import * as settingsService from "../services/companySetting.service";

export const getSettings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const settings = await settingsService.getSettings();

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSettings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const settings = await settingsService.updateSettings(req.body);

    res.status(200).json({
      success: true,
      message: "Settings updated successfully.",
      data: settings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};