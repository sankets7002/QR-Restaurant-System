import User from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    console.log("Incoming phone:", phone);

    const user = await User.findOne({ phone });

    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = password === user.passwordHash;

    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({
      message: "Login success"
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
