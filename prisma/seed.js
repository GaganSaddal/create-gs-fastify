const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../src/utils/password');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create regular user
  const userPassword = await hashPassword('user123');
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPassword,
      name: 'Regular User',
      role: 'USER',
      isActive: true,
    },
  });

  console.log('✅ Created regular user:', user.email);

  // Create moderator user
  const modPassword = await hashPassword('mod123');
  const moderator = await prisma.user.upsert({
    where: { email: 'mod@example.com' },
    update: {},
    create: {
      email: 'mod@example.com',
      password: modPassword,
      name: 'Moderator User',
      role: 'MODERATOR',
      isActive: true,
    },
  });

  console.log('✅ Created moderator user:', moderator.email);

  console.log('\n🎉 Seeding completed!');
  console.log('\nTest credentials:');
  console.log('Admin: admin@example.com / admin123');
  console.log('User: user@example.com / user123');
  console.log('Moderator: mod@example.com / mod123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
