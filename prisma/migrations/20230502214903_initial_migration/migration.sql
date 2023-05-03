-- CreateTable
CREATE TABLE "construction_sites" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "construction_sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "siteId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,
    "delivery_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "construction_sites_name_key" ON "construction_sites"("name");

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "construction_sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
