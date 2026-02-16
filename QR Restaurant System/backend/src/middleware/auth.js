import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = (roles = []) => {
  if (typeof roles === "string") roles = [roles];

  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "No token" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Optionally fetch full user from DB
      const user = await User.findById(decoded.id).select("-passwordHash");
      if (!user || !user.isActive) {
        return res.status(401).json({ message: "Invalid token or inactive user" });
      }

      req.user = user;

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (error) {
      console.error("JWT Error:", error.message);
      res.status(401).json({ message: "Invalid token" });
    }
  };
};
