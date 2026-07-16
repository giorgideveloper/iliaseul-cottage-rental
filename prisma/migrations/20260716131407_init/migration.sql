-- CreateTable
CREATE TABLE "Cottage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameGe" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "descGe" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "guests" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "amenities" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "availability" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cottageId" TEXT NOT NULL,
    "checkIn" TEXT NOT NULL,
    "checkOut" TEXT NOT NULL,
    "guests" INTEGER NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerNotes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "totalPrice" REAL NOT NULL,
    "createdAt" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "authorName" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "textGe" TEXT NOT NULL,
    "textEn" TEXT NOT NULL,
    "date" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FAQItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionGe" TEXT NOT NULL,
    "questionEn" TEXT NOT NULL,
    "answerGe" TEXT NOT NULL,
    "answerEn" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GalleryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "titleGe" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Settings" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL
);
