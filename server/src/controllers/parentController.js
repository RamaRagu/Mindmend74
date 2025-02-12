const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

// Register a new parent or doctor user
exports.register = async (req, res) => {
  const { email, password, name, contact, address, userType } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        contact,
        address,
        userType,
        ...(userType === "PARENT" && {
          parent: {
            create: {},
          },
        }),
        ...(userType === "DOCTOR" && {
          doctor: {
            create: {},
          },
        }),
      },
    });

    const token = jwt.sign(
      { id: user.id, userType: user.userType },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get details of a parent
exports.getParentDetails = async (req, res) => {
  try {
    const parent = await prisma.parent.findUnique({
      where: { userId: req.user.id },
      include: { user: true, children: true },
    });

    if (!parent) {
      return res.status(404).json({ error: "Parent not found" });
    }

    res.status(200).json(parent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a parent's information
exports.updateParent = async (req, res) => {
  const { name, contact, address } = req.body;

  try {
    const parent = await prisma.parent.update({
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

    res.status(200).json(parent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a parent account
exports.deleteParent = async (req, res) => {
  try {
    await prisma.parent.delete({
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
