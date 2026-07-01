import { z } from "zod";

export const createVehicleSchema = z.object({
  name: z.string().min(2, "Vehicle name is required"),

  type: z.enum(["SEDAN", "SUV", "LUXURY"]),

  vehicleNumber: z.string().min(3),

  seats: z.number().int().positive(),

  luggage: z.number().int().min(0),

  fuel: z.string().min(2),

  transmission: z.string().min(2),

  year: z.number().int().min(2000).max(new Date().getFullYear() + 1),

  color: z.string().min(2),

  airConditioned: z.boolean(),

  rating: z.number().min(0).max(5).optional(),

  tripType: z.enum([
    "LOCAL",
    "OUTSTATION",
    "AIRPORT",
  ]),

  pricePerKm: z.number().positive(),

  description: z.string().min(10),

  featured: z.boolean().optional(),

  available: z.boolean().optional(),

  images: z.array(
    z.object({
      imageUrl: z.string().url(),
      isPrimary: z.boolean().optional(),
    })
  ),

  features: z.array(
    z.object({
      feature: z.string(),
    })
  ),
});

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;