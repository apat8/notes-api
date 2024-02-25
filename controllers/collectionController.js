import asyncHandler from "express-async-handler"
import Collection from "../models/CollectionModel.js";

// @desc    Create new collection
// route    POST /api/collections/
// @access  Private
const addCollection = asyncHandler (async (req, res) => {
    const {title} = req.body;

    const collection = await Collection.create({
        title,
        userID: req.user._id
    });

    res.status(201).json({message:'Success'});
});

// @desc    Get all user collections 
// route    Get /api/collections/
// @access  Private
const getAllCollections = asyncHandler (async (req, res) => {
    const collections = await Collection.find({
        userID: req.user._id,
        isTrash: false
    }).exec();

    return res.status(200).json(collections);
});

// @desc    Get a user's collection by collection ID 
// route    Get /api/collections/:collectionID
// @access  Private
const getCollectionByID = asyncHandler (async (req, res) => {
    const collection = await Collection.findById(req.params.collectionID).exec();

    return res.status(200).json(collection);
});

// @desc    Update collection
// route    PUT /api/collections/:collectionID
// @access  Private
const updateCollectionByID = asyncHandler (async (req, res) => {
    const collection = await Collection.findById(req.params.collectionID).exec();

    if(collection){
        collection.title = req.body.title || collection.title;
        collection.isTrash = req.body.isTrash || collection.isTrash;

        const updatedCollection = await collection.save();

        res.status(200).json({
            message: 'Collection updated',
            collection: updatedCollection
        });
   
    }
    else {
        res.status(404);
        throw new Error("Collection not found");
    }
});

// @desc    Delete colection
// route    DELETE /api/collections/:collectionID
// @access  Private
const deleteCollectionByID = asyncHandler (async (req, res) => {
    const colection = await collection.deleteOne({_id: req.params.collectionID});

    res.status(200).json({
        message: 'Collection deleted'
    });
 
});

export {
    addCollection,
    getAllCollections,
    getCollectionByID,
    updateCollectionByID,
    deleteCollectionByID
};