import { z } from "zod";

export const createBookingSchema = z.object({
  customerName: z.string().min(2),

  customerPhone: z.string().min(10),

  customerEmail: z.string().email().optional(),

  pickup: z.string().min(2),

  destination: z.string().min(2),

  pickupDate: z.string(),

  tripType: z.enum([
    "LOCAL",
    "OUTSTATION",
    "AIRPORT",
  ]),

  vehicleId: z.string(),

  notes: z.string().optional(),
});