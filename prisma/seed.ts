import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import { defaultCMSData } from "../src/defaultData";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const adapter = new PrismaBetterSqlite3({
  url: `file:${path.resolve(__dirname, "./iliaseul.db")}`,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Cottages
  for (const c of defaultCMSData.cottages) {
    await prisma.cottage.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id,
        nameGe: c.name.ge,
        nameEn: c.name.en,
        descGe: c.description.ge,
        descEn: c.description.en,
        price: c.price,
        guests: c.guests,
        bedrooms: c.bedrooms,
        bathrooms: c.bathrooms,
        amenities: JSON.stringify(c.amenities),
        images: JSON.stringify(c.images),
        availability: JSON.stringify(c.availability),
      },
    });
  }

  // Bookings
  for (const b of defaultCMSData.bookings) {
    await prisma.booking.upsert({
      where: { id: b.id },
      update: {},
      create: {
        id: b.id,
        cottageId: b.cottageId,
        checkIn: b.checkIn,
        checkOut: b.checkOut,
        guests: b.guests,
        customerName: b.customerName,
        customerEmail: b.customerEmail,
        customerPhone: b.customerPhone,
        customerNotes: b.customerNotes ?? null,
        status: b.status,
        totalPrice: b.totalPrice,
        createdAt: b.createdAt,
      },
    });
  }

  // Reviews
  for (const r of defaultCMSData.reviews) {
    await prisma.review.upsert({
      where: { id: r.id },
      update: {},
      create: {
        id: r.id,
        authorName: r.authorName,
        rating: r.rating,
        textGe: r.text.ge,
        textEn: r.text.en,
        date: r.date,
      },
    });
  }

  // FAQs
  for (const f of defaultCMSData.faqs) {
    await prisma.fAQItem.upsert({
      where: { id: f.id },
      update: {},
      create: {
        id: f.id,
        questionGe: f.question.ge,
        questionEn: f.question.en,
        answerGe: f.answer.ge,
        answerEn: f.answer.en,
      },
    });
  }

  // Gallery
  for (const g of defaultCMSData.gallery) {
    await prisma.galleryItem.upsert({
      where: { id: g.id },
      update: {},
      create: {
        id: g.id,
        url: g.url,
        category: g.category,
        titleGe: g.title.ge,
        titleEn: g.title.en,
      },
    });
  }

  // Settings (contact, webSettings, texts)
  await prisma.settings.upsert({
    where: { key: "contact" },
    update: { value: JSON.stringify(defaultCMSData.contact) },
    create: { key: "contact", value: JSON.stringify(defaultCMSData.contact) },
  });

  await prisma.settings.upsert({
    where: { key: "webSettings" },
    update: { value: JSON.stringify(defaultCMSData.webSettings) },
    create: {
      key: "webSettings",
      value: JSON.stringify(defaultCMSData.webSettings),
    },
  });

  await prisma.settings.upsert({
    where: { key: "texts" },
    update: { value: JSON.stringify(defaultCMSData.texts) },
    create: { key: "texts", value: JSON.stringify(defaultCMSData.texts) },
  });

  // Default admin user (username: admin, password: admin123)
  const existing = await prisma.adminUser.findUnique({
    where: { username: "admin" },
  });
  if (!existing) {
    const passwordHash = await bcrypt.hash("admin123", 12);
    await prisma.adminUser.create({
      data: { username: "admin", passwordHash },
    });
    console.log("👤 Admin user created: admin / admin123");
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
