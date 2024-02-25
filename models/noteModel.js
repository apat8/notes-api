import mongoose from 'mongoose';

const noteSchema = mongoose.Schema(
    {
        title: String,
        content: String,
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        collectionID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Collection'
        },
        isTrash: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;