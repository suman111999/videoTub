const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        reuired: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);