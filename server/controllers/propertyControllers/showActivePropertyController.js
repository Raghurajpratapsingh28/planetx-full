const User = require("../../modals/Users");

exports.getActiveProperties = async (req, res) => {
  const  mobile  = req.user.mobile;
  console.log(mobile);
  if (!mobile) {
    return res.status(400).json({ error: "Mobile number is required." });
  }
  try {
    const user = await User.findOne({ mobile })
      .populate({
        path: "properties",
        populate: { path: "reviews" },
      })
      .lean();

      console.log(user.properties[0]);
      const cloudfrontBaseUrl = process.env.CLOUDFRONT_BASE_URL;
      const propertyData = user.properties.map((property) => {
        const modifiedImageUrl = property.images.map(img => {
          const fileNameWithPath = img.url.split("amazonaws.com/")[1] || img.url;
          return `${cloudfrontBaseUrl}${fileNameWithPath}`;
        })
        return {
          ...property,
          images: modifiedImageUrl,
        }
      })
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({
      message: "properties fetched successfully.",
      properties: propertyData,
    });
  } catch (error) {
    console.log("Error fetching  properties:", error);
    res.status(500).json({
      error: "An error occurred while fetching  properties.",
      details: error.message,
    });
  }
};
