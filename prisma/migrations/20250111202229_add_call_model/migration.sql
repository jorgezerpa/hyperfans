-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthday" TEXT;

-- CreateTable
CREATE TABLE "Call" (
    "id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "callId" TEXT NOT NULL,

    CONSTRAINT "Call_pkey" PRIMARY KEY ("id")
);
