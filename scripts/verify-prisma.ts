import "dotenv/config";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  try {
    const cottageCount = await prisma.cottage.count();
    const adminCount = await prisma.adminUser.count();
    console.log(
      `✅ Connected. Cottages: ${cottageCount}, Admins: ${adminCount}`,
    );
  } catch (err) {
    console.error("❌ Connection failed:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
