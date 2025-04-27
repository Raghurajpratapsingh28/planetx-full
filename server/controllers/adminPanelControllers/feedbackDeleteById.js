const centralFeedbackSchema = require("../../modals/Feedback");

const feedbackDeleteById = async (req, res) => {
  const { id } = req.params;
  const role = req.user.role;
  if (role !== "admin") {
    return res.status(403).json({ message: "You are not an admin" });
  }
  try {
    const feedback = await centralFeedbackSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback", error });
  }
};

module.exports = { feedbackDeleteById };