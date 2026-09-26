/*
  Warnings:

  - Changed the type of `paymentMethod` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "stripeSessionId" TEXT,
DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" TEXT NOT NULL;
