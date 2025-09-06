-- CreateTable
CREATE TABLE "public"."RoutingRule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "defaultMemberId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoutingRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Rule" (
    "id" SERIAL NOT NULL,
    "routingRuleId" INTEGER NOT NULL,
    "memberId" TEXT NOT NULL,

    CONSTRAINT "Rule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Statement" (
    "id" SERIAL NOT NULL,
    "ruleId" INTEGER NOT NULL,
    "field" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Statement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Rule_routingRuleId_idx" ON "public"."Rule"("routingRuleId");

-- CreateIndex
CREATE INDEX "Statement_ruleId_idx" ON "public"."Statement"("ruleId");

-- AddForeignKey
ALTER TABLE "public"."Rule" ADD CONSTRAINT "Rule_routingRuleId_fkey" FOREIGN KEY ("routingRuleId") REFERENCES "public"."RoutingRule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Statement" ADD CONSTRAINT "Statement_ruleId_fkey" FOREIGN KEY ("ruleId") REFERENCES "public"."Rule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
