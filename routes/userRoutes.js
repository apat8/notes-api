import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    authUser,
    resigterUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from "../controllers/userController.js"

const router = express.Router();

router.post("/auth", authUser);
router.post("/", resigterUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;