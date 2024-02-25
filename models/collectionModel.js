import mongoose from 'mongoose';

const collectionSchema = mongoose.Schema(
    {
        title: String,
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
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

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;