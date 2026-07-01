import prisma from "../prisma/client";
import { Prisma } from "@prisma/client";

export const createVehicle = async (data: any) => {
  return prisma.vehicle.create({
    data: {
      name: data.name,
      type: data.type,
      vehicleNumber: data.vehicleNumber,
      seats: data.seats,
      luggage: data.luggage,
      fuel: data.fuel,
      transmission: data.transmission,
      year: data.year,
      color: data.color,
      airConditioned: data.airConditioned,
      rating: data.rating ?? 5,
      tripType: data.tripType,
      pricePerKm: data.pricePerKm,
      description: data.description || "Vehicle Description",
      featured: data.featured ?? false,
      available: data.available ?? true,

      images: data.images?.length
        ? {
            create: data.images.map((url: string, i: number) => ({
              imageUrl: url,
              isPrimary: i === 0,
            })),
          }
        : undefined,

      features: data.features?.length
        ? { create: data.features }
        : undefined,
    },

    include: {
      images: true,
      features: true,
    },
  });
};


export const getAllVehicles = async (query: any) => {
  const {
    search,
    type,
    tripType,
    available,
    featured,
    sort,
  } = query;

  const where: Prisma.VehicleWhereInput = {};

  // Search by vehicle name
  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  // Filter by type
  if (type) {
    where.type = type;
  }

  // Filter by trip type
  if (tripType) {
    where.tripType = tripType;
  }

  // Filter by availability
  if (available !== undefined) {
    where.available = available === "true";
  }

  // Filter featured vehicles
  if (featured !== undefined) {
    where.featured = featured === "true";
  }

  return prisma.vehicle.findMany({
    where,

    include: {
      images: true,
      features: true,
    },

    orderBy: {
      pricePerKm: sort === "desc" ? "desc" : "asc",
    },
  });
};

export const getVehicleById = async (id: string) => {
  return prisma.vehicle.findUnique({
    where: { id },
    include: {
      images: true,
      features: true,
    },
  });
};

export const deleteVehicle = async (id: string) => {
  return prisma.vehicle.delete({
    where: { id },
  });
};


export const updateVehicle = async (
  id: string,
  data: any
) => {
  return prisma.vehicle.update({
    where: { id },

    data: {
      name: data.name,
      type: data.type,
      vehicleNumber: data.vehicleNumber,
      seats: data.seats,
      luggage: data.luggage,
      fuel: data.fuel,
      transmission: data.transmission,
      year: data.year,
      color: data.color,
      airConditioned: data.airConditioned,
      rating: data.rating,
      tripType: data.tripType,
      pricePerKm: data.pricePerKm,
      description: data.description || "Vehicle Description",
      featured: data.featured,
      available: data.available,

      images: data.images
        ? {
            deleteMany: {},
            create: data.images.map((url: string, i: number) => ({
              imageUrl: url,
              isPrimary: i === 0,
            })),
          }
        : undefined,

      features: data.features
        ? {
            deleteMany: {},
            create: data.features,
          }
        : undefined,
    },

    include: {
      images: true,
      features: true,
    },
  });
};