-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isLoggedIn" BOOLEAN NOT NULL,
    "expiresAt" DATETIME NOT NULL
);
