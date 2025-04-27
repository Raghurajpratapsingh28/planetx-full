const centralFeedbackSchema = require("../../modals/Feedback");

const getFeedbackByUserId = async (req, res) => {
  const { id } = req.params;    
  const role = req.user.role;
  if (role !== "admin") {
    return res.status(403).json({ message: "You are not an admin" });
  }
  try {
    const feedback = await centralFeedbackSchema.find({ userId: id });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
};

module.exports = { getFeedbackByUserId };