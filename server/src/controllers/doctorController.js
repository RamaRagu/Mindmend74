const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get details of a doctor
exports.getDoctorDetails = async (req, res) => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { userId: req.user.id },
      include: { user: true, sessions: true },
    });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

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
