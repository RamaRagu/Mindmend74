-- CreateTable
CREATE TABLE "User" (
    "_id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "role" TEXT NOT NULL DEFAULT 'PARENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Parent" (
    "_id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Child" (
    "_id" UUID NOT NULL,
    "parentId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "autismLevel" TEXT NOT NULL DEFAULT 'MILD',
    "progressNotes" JSONB,
    "sessionHistory" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Child_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "_id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "specialization" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "practiceLocation" TEXT,
    "availableSlots" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "TherapySession" (
    "_id" UUID NOT NULL,
    "childId" UUID NOT NULL,
    "doctorId" UUID NOT NULL,
    "sessionDate" TIMESTAMP(3) NOT NULL,
    "sessionType" TEXT NOT NULL DEFAULT 'ONLINE',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "reminderUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TherapySession_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Ebook" (
    "_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "bookNumber" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "description" TEXT,
    "ageRange" TEXT NOT NULL DEFAULT '3-6',
    "difficulty" TEXT NOT NULL DEFAULT 'BEGINNER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ebook_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "ChildEbookProgress" (
    "_id" UUID NOT NULL,
    "childId" UUID NOT NULL,
    "ebookId" UUID NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "lastPage" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChildEbookProgress_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_userId_key" ON "Parent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_userId_key" ON "Doctor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_licenseNumber_key" ON "Doctor"("licenseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ChildEbookProgress_childId_ebookId_key" ON "ChildEbookProgress"("childId", "ebookId");

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapySession" ADD CONSTRAINT "TherapySession_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapySession" ADD CONSTRAINT "TherapySession_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildEbookProgress" ADD CONSTRAINT "ChildEbookProgress_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildEbookProgress" ADD CONSTRAINT "ChildEbookProgress_ebookId_fkey" FOREIGN KEY ("ebookId") REFERENCES "Ebook"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
