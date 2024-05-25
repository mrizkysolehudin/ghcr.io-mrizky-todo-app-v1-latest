const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create roles
  const guestRole = await prisma.role.create({
    data: {
      type: 0,
      description: 'Guest'
    }
  });

  const registeredUserRole = await prisma.role.create({
    data: {
      type: 1,
      description: 'User'
    }
  });

  // Create users
  const user1 = await prisma.user.create({
    data: {
      roleType: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      password: '$2a$10$5CyNzzG4jJXpMT1L3Gj18e3T5XpCF1cT0/94I2wvhk6xYvacUFWx6',
    }
  });

  const user2 = await prisma.user.create({
    data: {
      roleType: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@gmail.com',
      password: '$2a$10$5CyNzzG4jJXpMT1L3Gj18e3T5XpCF1cT0/94I2wvhk6xYvacUFWx6',
    }
  });

  const guest = await prisma.user.create({
    data: {
      roleType: 0,
      firstName: 'Guest'
    }
  });

  // Create tasks
  await prisma.task.create({
    data: {
      isDone: false,
      title: 'Task 1',
      userId: user1.id
    }
  });

  await prisma.task.create({
    data: {
      isDone: true,
      title: 'Task 2',
      userId: user1.id
    }
  });

  await prisma.task.create({
    data: {
      isDone: false,
      title: 'Task 3',
      userId: user2.id
    }
  });

  await prisma.task.create({
    data: {
      isDone: false,
      title: 'Task 4',
      userId: guest.id
    }
  });

  console.log('Dummy data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
