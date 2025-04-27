const User = require("../../modals/Users");

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const role = req.user.role;
  if (role !== "admin") {
    return res.status(403).json({ message: "You are not an admin" });
  }
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = { deleteUser };