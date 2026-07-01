import prisma from "../prisma/client";

export const createBooking = async (data: any) => {
  return prisma.booking.create({
    data: {
      bookingNumber:
        "AK" + Date.now(),

      customerName: data.customerName,

      customerPhone: data.customerPhone,

      customerEmail: data.customerEmail,

      pickup: data.pickup,

      destination: data.destination,

      pickupDate: new Date(data.pickupDate),

      tripType: data.tripType,

      notes: data.notes,

      vehicleId: data.vehicleId,
    },

    include: {
      vehicle: true,
    },
  });
};

export const getAllBookings = async () => {
  return prisma.booking.findMany({
    include: {
      vehicle: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getBookingById = async (
  id: string
) => {
  return prisma.booking.findUnique({
    where: {
      id,
    },

    include: {
      vehicle: true,
    },
  });
};

export const updateBookingStatus = async (
  id: string,
  status: any
) => {
  return prisma.booking.update({
    where: {
      id,
    },

    data: {
      status,
    },
  });
};

export const deleteBooking = async (
  id: string
) => {
  return prisma.booking.delete({
    where: {
      id,
    },
  });
};