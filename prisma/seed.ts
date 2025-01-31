import { PrismaClient } from '@prisma/client';
import { PsychologistProps } from '@/app/types/props/PsychologistProps';

const prisma = new PrismaClient();

async function main() {
  const psychologist: Omit<PsychologistProps, 'id'>[] = [
    {
      slug: "yatskovska",
      name: "Мария Яцковская",
      image: "/images/maria.jpg",
      title: "Психолог",
      description: "Специалист по транзакционному анализу и психотерапии. Помогает клиентам находить гармонию и решать внутренние конфликты.",
      email: "mk.yatskovskaya@gmail.com",
      phone: "536066390",
      bg_color: "bg-purple",
      visit_type: "Онлайн",
      locale: "ru"
    },
    {
      slug: "bentsa",
      name: "Дария Бенца",
      image: "/images/daria.jpg",
      title: "Психолог",
      description: "Работает с тревожностью, стрессом и эмоциональными проблемами. Предлагает индивидуальные решения для улучшения качества жизни.",
      email: "dara.bentsa@gmail.com",
      phone: "536066392",
      bg_color: "bg-mint",
      visit_type: "Онлайн",
      locale: "ru"
    }
  ];

  await prisma.psychologist.createMany({ data: psychologist });
  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
