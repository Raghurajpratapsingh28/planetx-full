const basePropertySchema = require("../../modals/PropertyModals/BasePropertySchema")

const getPropertyByForRent = async (req,res)=>{
    try {
        const property = await basePropertySchema.find({propertyType:"For Rent"})
        res.status(200).json(property) 
    } catch (error) {
        res.status(500).json({message:"Error fetching property",error})
    }
}

const deletePropertyById = async (req,res)=>{
    const {id} = req.params;
    const role = req.user.role;
    if(role !== "admin"){
        return res.status(403).json({message:"You are not an admin"})
    }
    try {
        const property = await basePropertySchema.findByIdAndDelete(id);
        res.status(200).json({message:"Property deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Error deleting property",error})
    }
}

const getAllProperties = async (req,res)=>{
    try {
        const properties = await basePropertySchema.find()
        res.status(200).json(properties)
    } catch (error) {
        res.status(500).json({message:"Error fetching properties",error})
    }
}

const getPropertyByForSale = async (req, res) => {
  const role = req.user.role;
  if (role !== "admin") {
    return res.status(403).json({ message: "You are not an admin" });
  }
  try {
    const property = await basePropertySchema.find({ propertyType: "For Sale" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error });
  }
};

const filterProperties = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "admin") {
      return res.status(403).json({ message: "You are not an admin" });
    }
    const { propertyType, category } = req.query;

    if (!propertyType || !category) {
      return res.status(400).json({
        message:
          "Please provide all required fields: propertyType, category, and role.",
      });
    }

    const properties = await basePropertySchema.find({
      propertyType: propertyType,
      category: category,
    })
      .populate({ path: "user", select: "name email role whatsappMobile" })
      .lean();

    if (properties.length === 0) {
      return res
        .status(404)
        .json({ message: "No properties found matching the criteria." });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getPropertyByPg = async (req,res)=>{
    try {
        const property = await basePropertySchema.find({propertyType:"PG"})
        res.status(200).json(property)
    } catch (error) {
        res.status(500).json({message:"Error fetching property",error})
    }
}

const getPropertyByUserId = async (req, res) => {
  const { id } = req.params;
  const role = req.user.role;
  if (role !== "admin") {
    return res.status(403).json({ message: "You are not an admin" });
  }
  try {
    const property = await basePropertySchema.find({ user: id });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error });
  }
};

const newAddedProperty = async (req, res) => {
  const role = req.user.role;
  if (role !== "admin") {
    return res.status(403).json({ message: "You are not an admin" });
  }
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const properties = await basePropertySchema.find({
      createdAt: { $gte: oneWeekAgo }
    }).sort({ createdAt: -1 });

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error });
  }
};

const getPropertyByPropertyId = async (req, res) => {
  const { id } = req.params;
  const role = req.user.role;
  if (role !== "admin") {
    return res.status(403).json({ message: "You are not an admin" });
  }
  try {
    const property = await basePropertySchema.findById(id);
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error });
  }
};

module.exports = {
  getPropertyByForRent,
  deletePropertyById,
  getAllProperties,
  getPropertyByForSale,
  filterProperties,
  getPropertyByPg,
  getPropertyByUserId,
  newAddedProperty,
  getPropertyByPropertyId
};
