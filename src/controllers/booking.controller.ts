import { Request, Response } from "express";
import * as bookingService from "../services/booking.service";
import { createBookingSchema } from "../validations/booking.validation";
import { sendEmail } from "../utils/email";

// Create Booking
export const createBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validatedData = createBookingSchema.parse(req.body);

    const booking = await bookingService.createBooking(validatedData);

    // ----------------------------
    // 📧 Customer Email
    // ----------------------------
    if (validatedData.customerEmail) {
      try {
        await sendEmail(
          validatedData.customerEmail,
          "Booking Confirmed - AK Travels",
          `
            <h2>🎉 Booking Confirmed</h2>
            <p>Hi ${validatedData.customerName},</p>
            <p>Your booking has been confirmed successfully.</p>

            <h3>Trip Details</h3>
            <p><b>Pickup:</b> ${validatedData.pickup}</p>
            <p><b>Destination:</b> ${validatedData.destination}</p>
            <p><b>Pickup Date:</b> ${validatedData.pickupDate}</p>

            <br/>
            <p>Thank you for choosing AK Travels 🚖</p>
          `
        );
      } catch (emailErr: any) {
        console.error("❌ Customer email failed:", emailErr.message);
      }
    }

    // ----------------------------
    // 📧 Admin Email
    // ----------------------------
    if (process.env.ADMIN_EMAIL) {
      try {
        await sendEmail(
          process.env.ADMIN_EMAIL,
          "New Booking Received - AK Travels",
          `
            <h2>🚖 New Booking Alert</h2>

            <p><b>Name:</b> ${validatedData.customerName}</p>
            <p><b>Phone:</b> ${validatedData.customerPhone}</p>
            <p><b>Email:</b> ${validatedData.customerEmail || "N/A"}</p>

            <h3>Trip Details</h3>
            <p><b>Pickup:</b> ${validatedData.pickup}</p>
            <p><b>Destination:</b> ${validatedData.destination}</p>
            <p><b>Pickup Date:</b> ${validatedData.pickupDate}</p>
          `
        );
      } catch (emailErr: any) {
        console.error("❌ Admin email failed:", emailErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      data: booking,
    });
  } catch (error: any) {
    console.log("❌ Booking error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Bookings
export const getAllBookings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookings = await bookingService.getAllBookings();

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Booking By ID
export const getBookingById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const booking = await bookingService.getBookingById(id);

    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Booking Status
export const updateBookingStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const booking = await bookingService.updateBookingStatus(
      id,
      req.body.status
    );

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully.",
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Booking
export const deleteBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;
    await bookingService.deleteBooking(id);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};