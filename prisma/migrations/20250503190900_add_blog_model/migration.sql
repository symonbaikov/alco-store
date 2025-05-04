-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);
