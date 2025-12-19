-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "KpiType" AS ENUM ('NUMERIC', 'BOOLEAN', 'RATING');

-- CreateEnum
CREATE TYPE "KpiFrequency" AS ENUM ('DAILY', 'WEEKLY');

-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('ACTIVE', 'DORMANT');

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('CALL', 'MEETING');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FocusArea" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "color_code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FocusArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "deadline" TIMESTAMP(3) NOT NULL,
    "status" "GoalStatus" NOT NULL,
    "focusAreaId" TEXT NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KPI_Definition" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "KpiType" NOT NULL,
    "target_value" DOUBLE PRECISION,
    "frequency" "KpiFrequency" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "KPI_Definition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KPI_Log" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value_recorded" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "kpiDefinitionId" TEXT NOT NULL,

    CONSTRAINT "KPI_Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relationship_type" TEXT NOT NULL,
    "status" "ContactStatus" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interaction" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "InteractionType" NOT NULL,
    "notes" TEXT,
    "next_step_date" TIMESTAMP(3),
    "contactId" TEXT NOT NULL,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "FocusArea" ADD CONSTRAINT "FocusArea_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_focusAreaId_fkey" FOREIGN KEY ("focusAreaId") REFERENCES "FocusArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KPI_Definition" ADD CONSTRAINT "KPI_Definition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KPI_Log" ADD CONSTRAINT "KPI_Log_kpiDefinitionId_fkey" FOREIGN KEY ("kpiDefinitionId") REFERENCES "KPI_Definition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
