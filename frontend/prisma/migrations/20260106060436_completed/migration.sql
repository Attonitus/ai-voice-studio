/*
  Warnings:

  - You are about to drop the `AudioProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UploadedVoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AudioProject" DROP CONSTRAINT "AudioProject_userId_fkey";

-- DropForeignKey
ALTER TABLE "UploadedVoice" DROP CONSTRAINT "UploadedVoice_userId_fkey";

-- DropTable
DROP TABLE "AudioProject";

-- DropTable
DROP TABLE "UploadedVoice";

-- CreateTable
CREATE TABLE "audio_project" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "text" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "voiceS3Key" TEXT NOT NULL,
    "exaggeration" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "cfgWeight" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audio_project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uploaded_voice" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "uploaded_voice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "audio_project" ADD CONSTRAINT "audio_project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uploaded_voice" ADD CONSTRAINT "uploaded_voice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
