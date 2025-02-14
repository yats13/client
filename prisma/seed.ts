import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // First clear existing data
  await prisma.appointment.deleteMany();
  await prisma.psychologist.deleteMany();
  await prisma.user.deleteMany();

  // Create psychologists with unique slugs
  const psychologists = [
    {
      user: {
        create: {
          email: 'mk.yatskovskaya@gmail.com',
          phone: '536066390',
          password: '$2a$12$k8Y6JG3nB6w6JqWqtZDtBOyeKvQqvqZbzJcYsKjJ7zH3n7hN1zKbG', // hashed 'password123'
          role: Role.ADMIN
        }
      },
      name: 'Мария Яцковская',
      slug: 'yatskovska',
      title: 'Психолог',
      description: 'Опытный специалист в области корпоративных психологий',
      image: '/images/psychologists/maria.jpg',
      bg_color: 'bg-purple',
      visit_type: 'Онлайн',
      locale: 'ru'
    },
    {
      user: {
        create: {
          email: 'dara.bentsa@gmail.com',
          phone: '536066392',
          password: '$2a$12$k8Y6JG3nB6w6JqWqtZDtBOyeKvQqvqZbzJcYsKjJ7zH3n7hN1zKbG', // hashed 'password123'
          role: Role.ADMIN
        }
      },
      name: 'Дария Бенца',
      slug: 'bentsa',
      title: 'Психолог',
      description: 'Опытный специалист в области семейной терапии',
      image: '/images/psychologists/daria.jpg',
      bg_color: 'bg-mint',
      visit_type: 'Онлайн',
      locale: 'ru'
    }
  ];

  for (const psychData of psychologists) {
    await prisma.psychologist.create({
      data: psychData,
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
