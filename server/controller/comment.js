const Comment = require("../models/Comment");

const addComment = async (req, res) => {
    try {
        const newComment = await Comment.create({ userId: req.user.id, ...req.body });

        return res.status(200).json({
            message: `Successfully comment is added.`,
            success: true,
            newComment
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error while adding comment.`,
            success: false
        });
    }
};

const getComments = async (req, res) => {
    const { videoId } = req.params;
    try {
        const comments = await Comment.find({ videoId });

        return res.status(200).json({
            message: `Successfully fetch comments for video ${videoId}`,
            success: true,
            comments
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error while fetching comments for video ${videoId},error:${error}`,
            success: false
        });
    }
};

//will check it when frontend is complete
const deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete({});

    } catch (error) {
        return res.status(400).json({
            message: `Error while deleting comment.`,
            success: false
        });
    }
};

module.exports = {
    addComment, getComments, deleteComment
};