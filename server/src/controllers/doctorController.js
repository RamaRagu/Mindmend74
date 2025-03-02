const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: { user: true },
    });

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific doctor's information
exports.getDoctorDetails = async (req, res) => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { userId: req.user.id },
      include: { user: true },
    });

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a doctor's information
exports.updateDoctor = async (req, res) => {
  const { name, contact, address } = req.body;

  try {
    const doctor = await prisma.doctor.update({
      where: { userId: req.user.id },
      data: {
        user: {
          update: {
            name,
            contact,
            address,
          },
        },
      },
    });

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a doctor account
exports.deleteDoctor = async (req, res) => {
  try {
    await prisma.doctor.delete({
      where: { userId: req.user.id },
    });

    await prisma.user.delete({
      where: { id: req.user.id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add availability for a doctor
exports.addAvailability = async (req, res) => {
  const { date, slots } = req.body;
  const doctorId = req.params.id;

  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
  });

  let availableSlots = doctor.availableSlots || [];

  // Check if date already exists
  const dateEntry = availableSlots.find((d) => d.date === date);

  if (dateEntry) {
    dateEntry.slots = Array.from(new Set([...dateEntry.slots, ...slots]));
  } else {
    availableSlots.push({ date, slots });
  }

  await prisma.doctor.update({
    where: { id: doctorId },
    data: { availableSlots },
  });

  res.json({ message: "Availability updated", availableSlots });
};

// Get availability for a doctor
exports.getAvailability = async (req, res) => {
  const { date } = req.query;
  const doctorId = req.params.id;

  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
  });

  const availableSlots = doctor?.availableSlots || [];

  const slotsForDate = availableSlots.find((d) => d.date === date);

  res.json({ slots: slotsForDate ? slotsForDate.slots : [] });
};
