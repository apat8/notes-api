import asyncHandler from "express-async-handler"
import Note from "../models/noteModel.js";

// @desc    Create new note
// route    POST /api/notes/
// @access  Private
const addNote = asyncHandler (async (req, res) => {
    const {title, content, collectionID} = req.body;

    const note = await Note.create({
        title,
        content,
        collectionID,
        userID: req.user._id
    });

    res.status(201).json({message:'Success', note});
});

// @desc    Get all user notes 
// route    Get /api/notes/
// @access  Private
const getAllNotes = asyncHandler (async (req, res) => {
    const notes = await Note.find({
        userID: req.user._id
    }).exec();

    return res.status(200).json(notes);
});

// @desc    Get a user's note by note ID 
// route    Get /api/notes/:noteID
// @access  Private
const getNoteByID = asyncHandler (async (req, res) => {
    const note = await Note.findById(req.params.noteID).exec();

    return res.status(200).json(note);
});

// @desc    Update note
// route    PUT /api/notes/:noteID
// @access  Private
const updateNoteByID = asyncHandler (async (req, res) => {
    const note = await Note.findById(req.params.noteID).exec();

    if(note){
        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;
        note.isTrash = req.body.isTrash || note.isTrash;

        const updatedNote = await note.save();

        res.status(200).json({
            message: 'Note updated',
            note: updatedNote
        });
   
    }
    else {
        res.status(404);
        throw new Error("Note not found");
    }
});

// @desc    Delete note
// route    DELETE /api/notes/:noteID
// @access  Private
const deleteNoteByID = asyncHandler (async (req, res) => {
    const note = await Note.deleteOne({_id: req.params.noteID});

    res.status(200).json({
        message: 'Note deleted'
    });
 
});

export {
    addNote,
    getAllNotes,
    getNoteByID,
    updateNoteByID,
    deleteNoteByID
};