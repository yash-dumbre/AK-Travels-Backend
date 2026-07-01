import { Request, Response } from "express";
import * as vehicleService from "../services/vehicle.service";
// import { createVehicleSchema } from "../validations/vehicle.validation";
// import { uploadToCloudinary } from "../utils/uploadToCloudinary";

// Create Vehicle
export const createVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicle = await vehicleService.createVehicle({
      ...req.body,

      seats: Number(req.body.seats),
      luggage: Number(req.body.luggage),
      year: Number(req.body.year),
      rating: Number(req.body.rating ?? 5),
      pricePerKm: Number(req.body.pricePerKm),

      airConditioned: req.body.airConditioned,

      featured: req.body.featured,

      available: req.body.available,

      images: req.body.images || [],

      features: req.body.features || [],
    });

    res.status(201).json({
      success: true,
      data: vehicle,
    });
  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Vehicles
export const getAllVehicles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicles = await vehicleService.getAllVehicles(req.query);

    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Vehicle By ID
export const getVehicleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const vehicle = await vehicleService.getVehicleById(id);

    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Vehicle
export const deleteVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    await vehicleService.deleteVehicle(id);

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update vehicle



export const updateVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const id = req.params.id as string;

    const vehicle = await vehicleService.updateVehicle(id, {
      ...req.body,

      seats: Number(req.body.seats),
      luggage: Number(req.body.luggage),
      year: Number(req.body.year),
      rating: Number(req.body.rating),
      pricePerKm: Number(req.body.pricePerKm),

      airConditioned:
        req.body.airConditioned === "true",

      featured:
        req.body.featured === "true",

      available:
        req.body.available === "true",
    });

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully.",
      data: vehicle,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};