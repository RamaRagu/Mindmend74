const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new child account linked to a parent
exports.createChild = async (req, res) => {
  const { userId, name, age, autismLevel, progressNotes, sessionHistory } = req.body;

  try {
    const parent = await prisma.parent.findUnique({
      where: { userId },
    });

    const child = await prisma.child.create({
      data: {
        parentId: parent.id,
        name,
        age: parseInt(age),
        autismLevel: autismLevel || "Not diagnosed",
        progressNotes: progressNotes || "",
        sessionHistory: sessionHistory || [],
      },
    });
    res.status(201).json(child);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get details of a child by ID
exports.getChildById = async (req, res) => {
  const { id } = req.params;

  try {
    const child = await prisma.child.findUnique({
      where: { id },
    });

    if (!child) {
      return res.status(404).json({ error: "Child not found" });
    }

    res.status(200).json(child);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a child's information by ID
exports.updateChildById = async (req, res) => {
  const { id } = req.params;
  const { name, age, autismLevel, progressNotes, sessionHistory } = req.body;

  try {
    const child = await prisma.child.findUnique({ where: { id } });

    if (!child) {
      return res.status(404).json({ error: "Child not found" });
    }

    if (child.parentId !== req.user.parent.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this record" });
    }

    const updatedChild = await prisma.child.update({
      where: { id },
      data: {
        name,
        age,
        autismLevel,
        progressNotes,
        sessionHistory,
      },
    });

    res.status(200).json(updatedChild);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a child account by ID
exports.deleteChildById = async (req, res) => {
  const { id } = req.params;

  try {
    const child = await prisma.child.findUnique({ where: { id } });

    if (!child) {
      return res.status(404).json({ error: "Child not found" });
    }

    if (child.parentId !== req.user.parent.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this record" });
    }

    await prisma.child.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
