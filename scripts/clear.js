const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.Incentive.deleteMany({});
  console.log("All rows deleted ✅");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
