import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import type {
  CMSData,
  Cottage,
  Booking,
  Review,
  FAQItem,
  GalleryItem,
} from "../src/types";

const JWT_SECRET = process.env.JWT_SECRET || "iliaseul-super-secret-2026";
const JWT_EXPIRES = "7d";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.resolve(__dirname, "../public/uploads");
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Multer — save to public/uploads, keep original extension
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

const adapter = new PrismaBetterSqlite3({
  url: `file:${path.resolve(__dirname, "../prisma/iliaseul.db")}`,
});
const prisma = new PrismaClient({ adapter });
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(UPLOADS_DIR));

// ─── Helpers: convert DB rows → TypeScript types ─────────────────────────────

function dbCottage(c: any): Cottage {
  return {
    id: c.id,
    name: { ge: c.nameGe, en: c.nameEn },
    description: { ge: c.descGe, en: c.descEn },
    price: c.price,
    guests: c.guests,
    bedrooms: c.bedrooms,
    bathrooms: c.bathrooms,
    amenities: JSON.parse(c.amenities),
    images: JSON.parse(c.images),
    availability: JSON.parse(c.availability),
  };
}

function dbBooking(b: any): Booking {
  return {
    id: b.id,
    cottageId: b.cottageId,
    checkIn: b.checkIn,
    checkOut: b.checkOut,
    guests: b.guests,
    customerName: b.customerName,
    customerEmail: b.customerEmail,
    customerPhone: b.customerPhone,
    customerNotes: b.customerNotes ?? undefined,
    status: b.status as Booking["status"],
    totalPrice: b.totalPrice,
    createdAt: b.createdAt,
  };
}

function dbReview(r: any): Review {
  return {
    id: r.id,
    authorName: r.authorName,
    rating: r.rating,
    text: { ge: r.textGe, en: r.textEn },
    date: r.date,
  };
}

function dbFaq(f: any): FAQItem {
  return {
    id: f.id,
    question: { ge: f.questionGe, en: f.questionEn },
    answer: { ge: f.answerGe, en: f.answerEn },
  };
}

function dbGallery(g: any): GalleryItem {
  return {
    id: g.id,
    url: g.url,
    category: g.category,
    title: { ge: g.titleGe, en: g.titleEn },
  };
}

// ─── Auth middleware ──────────────────────────────────────────────────────────
function requireAuth(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const payload = jwt.verify(authHeader.slice(7), JWT_SECRET) as {
      id: string;
      username: string;
    };
    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }
  try {
    const user = await prisma.adminUser.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES },
    );
    res.json({ token, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

// ─── GET /api/auth/me — verify token ─────────────────────────────────────────
app.get("/api/auth/me", requireAuth, (req: any, res) => {
  res.json({ username: req.admin.username });
});

// ─── POST /api/upload — upload image file (protected) ────────────────────────
app.post("/api/upload", requireAuth, upload.single("file"), (req: any, res) => {
  if (!req.file) return res.status(400).json({ error: "No file provided" });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

// ─── GET /api/cms — returns full CMSData ─────────────────────────────────────
app.get("/api/cms", async (_req, res) => {
  try {
    const [
      cottages,
      bookings,
      reviews,
      faqs,
      gallery,
      contactRow,
      webRow,
      textsRow,
    ] = await Promise.all([
      prisma.cottage.findMany(),
      prisma.booking.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.review.findMany(),
      prisma.fAQItem.findMany(),
      prisma.galleryItem.findMany(),
      prisma.settings.findUnique({ where: { key: "contact" } }),
      prisma.settings.findUnique({ where: { key: "webSettings" } }),
      prisma.settings.findUnique({ where: { key: "texts" } }),
    ]);

    const data: CMSData = {
      cottages: cottages.map(dbCottage),
      bookings: bookings.map(dbBooking),
      reviews: reviews.map(dbReview),
      faqs: faqs.map(dbFaq),
      gallery: gallery.map(dbGallery),
      contact: contactRow ? JSON.parse(contactRow.value) : {},
      webSettings: webRow ? JSON.parse(webRow.value) : {},
      texts: textsRow ? JSON.parse(textsRow.value) : {},
    };

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load CMS data" });
  }
});

// ─── PUT /api/cms — saves full CMSData (protected) ───────────────────────────
app.put("/api/cms", requireAuth, async (req, res) => {
  const data: CMSData = req.body;
  try {
    // Cottages
    await prisma.cottage.deleteMany();
    for (const c of data.cottages) {
      await prisma.cottage.create({
        data: {
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
    await prisma.booking.deleteMany();
    for (const b of data.bookings) {
      await prisma.booking.create({
        data: {
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
    await prisma.review.deleteMany();
    for (const r of data.reviews) {
      await prisma.review.create({
        data: {
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
    await prisma.fAQItem.deleteMany();
    for (const f of data.faqs) {
      await prisma.fAQItem.create({
        data: {
          id: f.id,
          questionGe: f.question.ge,
          questionEn: f.question.en,
          answerGe: f.answer.ge,
          answerEn: f.answer.en,
        },
      });
    }

    // Gallery
    await prisma.galleryItem.deleteMany();
    for (const g of data.gallery) {
      await prisma.galleryItem.create({
        data: {
          id: g.id,
          url: g.url,
          category: g.category,
          titleGe: g.title.ge,
          titleEn: g.title.en,
        },
      });
    }

    // Settings
    for (const key of ["contact", "webSettings", "texts"] as const) {
      await prisma.settings.upsert({
        where: { key },
        update: { value: JSON.stringify(data[key]) },
        create: { key, value: JSON.stringify(data[key]) },
      });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save CMS data" });
  }
});

// ─── POST /api/bookings — create a single booking ────────────────────────────
app.post("/api/bookings", async (req, res) => {
  const b: Booking = req.body;
  try {
    const created = await prisma.booking.create({
      data: {
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
    res.status(201).json(dbBooking(created));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// ─── PATCH /api/bookings/:id — update booking status (protected) ─────────────
app.patch("/api/bookings/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updated = await prisma.booking.update({
      where: { id },
      data: { status },
    });
    res.json(dbBooking(updated));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update booking" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Iliaseul API running at http://localhost:${PORT}`);
});
