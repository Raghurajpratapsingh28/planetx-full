const User = require("../../modals/Users");

exports.verifyPasswordForDeletion = async (req, res) => {
  const { password } = req.body;
  const role = req.user.role;

  if (role !== "admin") {
    return res.status(403).json({ message: "You are not an admin" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    if (password === "@dminP@ss") {
      res.status(200).json({ message: "Password verified successfully" });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error verifying password", error });
  }
};
