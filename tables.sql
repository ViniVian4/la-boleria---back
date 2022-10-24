CREATE TABLE "cakes" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL UNIQUE,
  "price" NUMERIC NOT NULL,
  "image" VARCHAR(31) NOT NULL,
  "description" TEXT
);

CREATE TABLE "clients" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "address" VARCHAR(60),
  "phone" VARCHAR(11)
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "clientId" INTEGER NOT NULL REFERENCES "clients"("id"),
  "cakeId" INTEGER NOT NULL REFERENCES "cakes"("id"),
  "quantity" INTEGER NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
  "totalPrice" NUMERIC NOT NULL
);