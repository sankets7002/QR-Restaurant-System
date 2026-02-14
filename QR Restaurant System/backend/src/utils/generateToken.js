import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
      restaurantId: user.restaurantId
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
