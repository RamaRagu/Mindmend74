import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const doctorInput = [
    {
      name: 'Dr. Marcel Johnson',
      specialization: 'Clinical Psychologist',
      licenseNumber: 'PSY123456',
      practiceLocation: 'Colombo, Sri Lanka',
      availableSlots: JSON.stringify([
        { day: 'Monday', time: '9:00 AM - 5:00 PM' },
        { day: 'Wednesday', time: '10:00 AM - 4:00 PM' },
      ]),
    },
    {
      name: 'Dr. Jane Smith',
      specialization: 'Child Psychologist',
      licenseNumber: 'PSY654321',
      practiceLocation: 'Kandy, Sri Lanka',
      availableSlots: JSON.stringify([
        { day: 'Tuesday', time: '8:00 AM - 3:00 PM' },
        { day: 'Thursday', time: '11:00 AM - 6:00 PM' },
      ]),
    },
    {
      name: 'Dr. Robert Brown',
      specialization: 'Behavioral Psychologist',
      licenseNumber: 'PSY789012',
      practiceLocation: 'Galle, Sri Lanka',
      availableSlots: JSON.stringify([
        { day: 'Friday', time: '9:00 AM - 5:00 PM' },
        { day: 'Saturday', time: '10:00 AM - 2:00 PM' },
      ]),
    },
    {
      name: 'Dr. Emily Davis',
      specialization: 'Cognitive Psychologist',
      licenseNumber: 'PSY345678',
      practiceLocation: 'Jaffna, Sri Lanka',
      availableSlots: JSON.stringify([
        { day: 'Monday', time: '10:00 AM - 6:00 PM' },
        { day: 'Thursday', time: '9:00 AM - 3:00 PM' },
      ]),
    },
    {
      name: 'Dr. Michael Lee',
      specialization: 'Forensic Psychologist',
      licenseNumber: 'PSY987654',
      practiceLocation: 'Negombo, Sri Lanka',
      availableSlots: JSON.stringify([
        { day: 'Wednesday', time: '8:00 AM - 4:00 PM' },
        { day: 'Friday', time: '10:00 AM - 5:00 PM' },
      ]),
    },
    {
      name: 'Dr. Sarah Wilson',
      specialization: 'Educational Psychologist',
      licenseNumber: 'PSY112233',
      practiceLocation: 'Matara, Sri Lanka',
      availableSlots: JSON.stringify([
        { day: 'Tuesday', time: '9:00 AM - 5:00 PM' },
        { day: 'Thursday', time: '11:00 AM - 6:00 PM' },
      ]),
    },
    {
      name: 'Dr. David Clark',
      specialization: 'Health Psychologist',
      licenseNumber: 'PSY445566',
      practiceLocation: 'Anuradhapura, Sri Lanka',
      availableSlots: JSON.stringify([
        { day: 'Monday', time: '8:00 AM - 4:00 PM' },
        { day: 'Friday', time: '9:00 AM - 5:00 PM' },
      ]),
    },
    {
      name: 'Dr. Olivia Martinez',
      specialization: 'Neuropsychologist',
      licenseNumber: 'PSY778899',
      practiceLocation: 'Batticaloa, Sri Lanka',
      availableSlots: JSON.stringify([
        { day: 'Wednesday', time: '10:00 AM - 6:00 PM' },
        { day: 'Saturday', time: '9:00 AM - 1:00 PM' },
      ]),
    },
  ];

  // Insert data into the Doctor table
  for (const doctor of doctorInput) {
    // Create the User
    const user = await prisma.user.create({
      data: {
        email: `${doctor.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        password: 'password123',
        name: doctor.name,
      },
    });

    // Create the Doctor and connect it to the User
    await prisma.doctor.create({
      data: {
        doctorId: user.id,
        name: doctor.name,
        specialization: doctor.specialization,
        licenseNumber: doctor.licenseNumber,
        practiceLocation: doctor.practiceLocation,
        availableSlots: doctor.availableSlots,
        imageUrl: imageUrl, 
      },
    });
  }

  console.log('Doctors added successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });