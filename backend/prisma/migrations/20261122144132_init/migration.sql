-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "posisi" TEXT NOT NULL,
    "perusahaan" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "tipe" TEXT NOT NULL,
    "gaji" INTEGER NOT NULL,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
