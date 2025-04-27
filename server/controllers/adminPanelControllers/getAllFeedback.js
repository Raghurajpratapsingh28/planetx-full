const feedbackSchema = require("../../modals/Feedback");

const getAllFeedback = async (req, res) => {
  const role = req.user.role;
    console.log(role);
  if (role !== "admin") {
    return res.status(403).json({ message: "You are not an admin" });
  }
  try {
    const feedback = await feedbackSchema.find();
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
};

module.exports = { getAllFeedback };

