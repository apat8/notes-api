import express from "express";
import protect from "../middleware/authMiddleware.js";
import { 
    addCollection, 
    getAllCollections, 
    getCollectionByID,
    getCollectionNotes, 
    updateCollectionByID, 
    deleteCollectionByID } from "../controllers/collectionController.js";

const router = express.Router();

router.route('/').post(protect, addCollection).get(protect, getAllCollections);
router.route('/:collectionID').get(protect, getCollectionByID).put(protect, updateCollectionByID).delete(protect, deleteCollectionByID);
router.route('/:collectionID/notes').get(protect, getCollectionNotes);

export default router;