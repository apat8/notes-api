import express from "express";
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

export default router;