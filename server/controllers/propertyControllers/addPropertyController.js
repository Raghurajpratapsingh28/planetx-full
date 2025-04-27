const Property = require("../../modals/PropertyModals/BasePropertySchema");
require("../../modals/PropertyModals/ResidentialSchema");
require("../../modals/PropertyModals/EventspaceSchema");
require("../../modals/PropertyModals/HotelSchema");
require("../../modals/PropertyModals/OfficeSchema");
require("../../modals/PropertyModals/SharedWarehouseSchema");
require("../../modals/PropertyModals/ShopSchema");
require("../../modals/PropertyModals/WarehouseSchema");
require("../../modals/PropertyModals/pgSchema");
const User = require("../../modals/Users");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3, bucketName } = require("../../utils/s3"); 

exports.addProperty = async (req, res) => {
  try {
    console.log("req.body: ", req.body);

    const userId = req.user.userId;
    const propertyData = req.body.propertyData;

    if (!userId || !propertyData) {
      return res.status(400).json({ message: "User ID and Property data are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const PropertyCategory = Property.discriminators[propertyData.category];
    console.log(PropertyCategory);
    // if (!PropertyCategory) {
    //   return res.status(400).json({ message: "Valid Property Category required!" });
    // }

    const newProperty = new PropertyCategory({
      ...propertyData,
      user: userId,
      images: req.body.images.map(url => ({
        name: url.split('/').pop(), // Extract filename from URL
        url: url
      })),
      video: req.body.video,
    });

    console.log(newProperty);
    const savedProperty = await newProperty.save();

    user.properties.push(savedProperty._id);
    await user.save();

    res.status(201).json({
      message: "Property added successfully",
      property: savedProperty,
    });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ message: "Error adding property", error: error.message });
  }
};
