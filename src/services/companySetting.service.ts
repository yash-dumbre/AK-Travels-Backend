import prisma from "../prisma/client";

export const getSettings = async () => {
  let settings = await prisma.companySetting.findFirst();

  // create a default row if none exists yet
  if (!settings) {
    settings = await prisma.companySetting.create({
      data: {
        companyName: "AK Travels",
        phone: "+91 9529781087",
        whatsapp: "919529781087",
        email: "booking@aktravels.com",
        address: "Pune, Maharashtra",
      },
    });
  }

  return settings;
};

export const updateSettings = async (data: any) => {
  const existing = await prisma.companySetting.findFirst();

  if (!existing) {
    return prisma.companySetting.create({ data });
  }

  return prisma.companySetting.update({
    where: { id: existing.id },
    data,
  });
};