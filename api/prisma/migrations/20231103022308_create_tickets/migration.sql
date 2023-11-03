-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "ticket" INTEGER NOT NULL,
    "codTransporter" INTEGER NOT NULL,
    "product" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
