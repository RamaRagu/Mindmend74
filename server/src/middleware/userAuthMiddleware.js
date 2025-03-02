const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const authMiddleware = (roles) => {
  return async (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (roles && !roles.includes(user.role)) {
        return res.status(403).json({
          message: "Forbidden: You do not have the required permissions",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid access token" });
    }
  };
};

module.exports = authMiddleware;
