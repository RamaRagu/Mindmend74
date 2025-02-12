const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new therapy session
exports.createSession = async (req, res) => {
  const { childId, doctorId, date } = req.body;

  try {
    const session = await prisma.therapySession.create({
      data: {
        childId,
        doctorId,
        date,
      },
    });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get details of a therapy session by ID
exports.getSessionById = async (req, res) => {
  const { id } = req.params;

  try {
    const session = await prisma.therapySession.findUnique({
      where: { id },
      include: { child: true, doctor: true },
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a therapy session by ID
exports.updateSessionById = async (req, res) => {
  const { id } = req.params;
  const { date, status } = req.body;

  try {
    const session = await prisma.therapySession.update({
      where: { id },
      data: {
        date,
        status,
      },
    });

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a therapy session by ID
exports.deleteSessionById = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.therapySession.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all sessions for a doctor
exports.getDoctorSessions = async (req, res) => {
  try {
    const sessions = await prisma.therapySession.findMany({
      where: { doctorId: req.user.doctor.id },
      include: { child: true },
    });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
