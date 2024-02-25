import express from "express";
import protect from "../middleware/authMiddleware.js";
import { addNote, getAllNotes, getNoteByID, updateNoteByID, deleteNoteByID } from "../controllers/noteController.js";

const router = express.Router();

router.route('/').post(protect, addNote).get(protect, getAllNotes);
router.route('/:noteID').get(protect, getNoteByID).put(protect, updateNoteByID).delete(protect, deleteNoteByID);

export default router;