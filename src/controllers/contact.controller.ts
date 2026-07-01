import { Request, Response } from "express";
import prisma from "../prisma/client";

export const createContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, phone, email, message } = req.body;

    const contact = await prisma.contact.create({
      data: { name, phone, email, message },
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: contact,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllContacts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};