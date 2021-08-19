CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- CreateTable
CREATE TABLE "Google" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "logo" TEXT,
    "googleID" TEXT,
    "googleVerified" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "People" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "id_google" UUID,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "id_owner" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_people" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Waiter" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "number_waiter" INTEGER NOT NULL,
    "id_restaurant" UUID NOT NULL,
    "id_people" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type_plate_drink" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "id_restaurant" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Table" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name_table" TEXT NOT NULL,
    "count_chairs" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "id_restaurant" UUID NOT NULL,
    "id_waiter" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addition" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "id_table" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Additionproduct" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "count_product" INTEGER NOT NULL,
    "id_addition" UUID NOT NULL,
    "id_product" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Waiter.number_waiter_unique" ON "Waiter"("number_waiter");

-- AddForeignKey
ALTER TABLE "People" ADD FOREIGN KEY ("id_google") REFERENCES "Google"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD FOREIGN KEY ("id_owner") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owner" ADD FOREIGN KEY ("id_people") REFERENCES "People"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waiter" ADD FOREIGN KEY ("id_restaurant") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waiter" ADD FOREIGN KEY ("id_people") REFERENCES "People"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("id_restaurant") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table" ADD FOREIGN KEY ("id_restaurant") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table" ADD FOREIGN KEY ("id_waiter") REFERENCES "Waiter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addition" ADD FOREIGN KEY ("id_table") REFERENCES "Table"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Additionproduct" ADD FOREIGN KEY ("id_addition") REFERENCES "Addition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Additionproduct" ADD FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
