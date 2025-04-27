const express = require("express");
const { filterProperties, getPropertyByUserId, getPropertyByPropertyId, getPropertyByForSale, deletePropertyById, getPropertyByForRent, getPropertyByPg, getAllProperties, newAddedProperty } = require("../controllers/adminPanelControllers/adminPropertyControllers");
const { postNotification } = require("../controllers/adminPanelControllers/postNotificationController");
const { getAllFeedback } = require("../controllers/adminPanelControllers/getAllFeedback");
const { getAllUsers } = require("../controllers/adminPanelControllers/gettingAllUsers");
const { getUserById } = require("../controllers/adminPanelControllers/getUserbyId");
const { feedbackDeleteById } = require("../controllers/adminPanelControllers/feedbackDeleteById");
const { getFeedbackByUserId } = require("../controllers/adminPanelControllers/getFeedbackByUserId");
const { deleteUser } = require("../controllers/adminPanelControllers/adminUserController");
const { verifyPasswordForDeletion } = require("../controllers/adminPanelControllers/verifyPasswordforDeletion");


const router = express.Router();

// Apply authentication middleware to all routes


router.get("/filter-properties", filterProperties);
router.get("/get-users", getAllUsers);
router.post("/post-notifications", postNotification);
router.get("/get-all-feedback", getAllFeedback);
router.get("/get-user-by-id/:id", getUserById);
router.delete("/delete-feedback/:id", feedbackDeleteById);
router.get("/get-property-by-user-id/:id", getPropertyByUserId);
router.get("/get-feedback-by-user-id/:id", getFeedbackByUserId);
router.get("/get-property-by-property-id/:id", getPropertyByPropertyId);
router.delete("/delete-user/:id", deleteUser);
router.post("/verify-password", verifyPasswordForDeletion);
router.get("/get-property-by-for-sale", getPropertyByForSale);
router.delete("/delete-property-by-id/:id", deletePropertyById);
router.get("/get-property-by-for-rent",getPropertyByForRent);
router.get("/get-property-by-pg",getPropertyByPg);
router.get("/get-all-properties",getAllProperties);
router.get("/get-new-properties",newAddedProperty);

module.exports = router;
