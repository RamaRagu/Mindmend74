import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const imageUrl = 'https://th.bing.com/th?id=OLC.yW+Sp+HUKItq/w480x360&rs=1&pid=ImgDetMain';

  try {
    // Get all doctors
    const doctors = await prisma.doctor.findMany();

    // Update each doctor with the new image URL
    for (const doctor of doctors) {
      await prisma.doctor.update({
        where: {
          doctorId: doctor.doctorId,
        },
        data: {
          imageUrl: imageUrl,
        },
      });
      console.log(`Updated image URL for doctor ${doctor.name}`);
    }

    console.log('All doctors updated successfully!');
  } catch (error) {
    console.error('Error updating doctors:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();