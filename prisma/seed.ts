import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // First clear existing data
  await prisma.psychologist.deleteMany();

  // Create psychologists with unique slugs
  const psychologists = [
    {
      name: 'Мария Яцковская',
      slug: 'yatskovska',
      title: 'Психолог',
      description: 'Опытный специалист в области корпоративных психологий',
      image: '/images/psychologists/maria.jpg',
      email: 'mk.yatskovskaya@gmail.com',
      phone: '536066390',
      bg_color: 'bg-purple',
      visit_type: 'Онлайн',
      locale: 'ru'
    },
    {
      name: 'Дария Бенца',
      slug: 'bentsa',
      title: 'Психолог',
      description: 'Опытный специалист в области семейной терапии',
      image: '/images/psychologists/daria.jpg',
      email: 'dara.bentsa@gmail.com',
      phone: '536066392',
      bg_color: 'bg-mint',
      visit_type: 'Онлайн',
      locale: 'ru'
    },
    // Add more psychologists as needed
  ];

  for (const psychologist of psychologists) {
    await prisma.psychologist.create({
      data: psychologist,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
