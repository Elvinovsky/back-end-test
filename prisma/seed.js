import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const categories = [
    { name: 'Functionality' },
    { name: 'Bug' },
    { name: 'UI' },
    { name: 'Performance' },
  ];

  const statuses = [
    { name: 'Idea' },
    { name: 'Planned' },
    { name: 'In Progress' },
    { name: 'Completed' },
  ];


  // Создание категорий
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  // Создание статусов
  for (const status of statuses) {
    await prisma.status.upsert({
      where: { name: status.name },
      update: {},
      create: status,
    });
  }

  console.log('Seed data has been added!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
