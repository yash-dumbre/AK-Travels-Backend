import bcrypt from "bcrypt";
import prisma from "../prisma/client";

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: "admin@aktravels.com",
    },
  });

  if (existingAdmin) {
    console.log("✅ Admin already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.user.create({
    data: {
      name: "Administrator",
      email: "admin@aktravels.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("🎉 Admin created successfully!");
  console.log("----------------------------------");
  console.log("Email    : admin@aktravels.com");
  console.log("Password : Admin@123");
  console.log("----------------------------------");
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });