-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthPlace" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "childrenCount" INTEGER NOT NULL DEFAULT 0,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "employeeNumber" TEXT NOT NULL,
    "hireDate" TIMESTAMP(3) NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "department" TEXT,
    "contractType" TEXT NOT NULL,
    "baseSalary" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "bankName" TEXT,
    "bankAccount" TEXT,
    "socialSecurityNumber" TEXT,
    "healthInsuranceNumber" TEXT,
    "retirementFundNumber" TEXT,
    "socialSecurityRate" DOUBLE PRECISION,
    "healthInsuranceRate" DOUBLE PRECISION,
    "retirementFundRate" DOUBLE PRECISION,
    "incomeTax" DOUBLE PRECISION,
    "benefitsInKind" TEXT,
    "terminationDate" TIMESTAMP(3),
    "terminationReason" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_nationalId_key" ON "Employee"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeNumber_key" ON "Employee"("employeeNumber");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
