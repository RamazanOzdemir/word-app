-- CreateTable
CREATE TABLE "Word" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "context" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'noun',
    "description" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_id_key" ON "Word"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Word_context_key" ON "Word"("context");
