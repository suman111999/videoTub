const User = require("../models/User");
const Video = require("../models/Video");

//added user in User collection during signUp.

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        return res.status(200).json({
            message: `Successfully fetched the details of  user ${user?.id}`,
            success: true,
            user
        });
    } catch (error) {
        return res.status(200).json({
            message: `Error while fetching the details of user ${id} ,error:${error}`,
            success: false
        });
    };
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    try {
        if (id === userId) {
            const updatedUserDetails = await User.findOneAndUpdate({ id }, { ...req.body }, { new: true });

            return res.status(200).json({
                message: `Successfully updated your account details`,
                success: true,
                updatedUserDetails
            });
        }
        else {
            return res.status(403).json({
                message: `You can update only your account details.`,
                success: false
            });
        };

    } catch (error) {
        return res.status(400).json({
            message: `Error while updating details for user ${userId},error:${error}`,
            success: false
        });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    try {
        if (id === userId) {
            await User.findByIdAndDelete(id);

            return res.status(200).json({
                message: `User has been deleted`,
                success: true
            });
        } else {
            return res.status(403).json({
                message: `You can delete only your account`,
                success: false
            });
        };
    } catch (error) {
        return res.status(400).json({
            message: `Error while deleting details of user ${userId},error : ${error}`,
            success: false
        });
    };
};

const likeVideo = async (req, res) => {
    //$push ->we can add duplicate also
    //$addToSet->duplicate will not be added
    const { id } = req.user;
    const { videoId } = req.params;
    try {
        //find video and push my id in likes array
        //and if I am liking video then if I have already disliked then remove my id from dislike array
        const video = await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { disLikes: id }
        }, { new: true });

        return res.status(200).json({
            message: `Successfully liked the video ${videoId}`,
            success: true,
            video
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error while likeing video ${videoId},error : ${error}`,
            success: false
        });
    }
};

const dislikeVideo = async (req, res) => {
    const { id } = req.user;
    const { videoId } = req.params;
    try {
        const video = await Video.findByIdAndUpdate(videoId, {
            $addToSet: { disLikes: id },
            $pull: { likes: id }
        });

        return res.status(200).json({
            message: `Successfully disLiked the video ${videoId}`,
            success: true,
            video
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error while disLikeing video ${videoId},error : ${error}`,
            success: false
        });
    }
};

const subscribe = async (req, res) => {
    const { id } = req.params;//other user/channel id whom I am doing to subscribe
    const { id: userId } = req.user;//it is my id

    try {
        //find my record in User collection and push id of subscribed(going to) chanel/user in subscribedUsers array of my recod 
        await User.findByIdAndUpdate(userId, {
            $push: { subscribedUsers: id }
        });

        //now increase the subscribers by 1 of that other channel/user
        await User.findByIdAndUpdate(id, {
            $inc: { subscribers: 1 }
        });

        return res.status(200).json({
            message: `Successfully subscribe the user ${id}`,
            success: true
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error while subscribing the user ${id} by user ${userId},error : ${error}`,
            success: false
        });
    };
};

const unsubscribe = async (req, res) => {
    console.log(req)
    const { id } = req.params;
    const { id: userId } = req.user;

    try {
        await User.findByIdAndUpdate(userId, {
            $pull: { subscribedUsers: id }
        });

        await User.findByIdAndUpdate({ id }, {
            $inc: {
                subscribers: -1
            }
        });

        return res.status(200).json({
            message: `Successfully unsubscribe the user ${id}`,
            success: true
        });

    } catch (error) {
        return res.status(400).json({
            message: `Error while unsubscribing the user ${id} by user ${userId},error : ${error}`,
            success: false
        });
    };

};

module.exports = { getUser, updateUser, deleteUser, likeVideo, dislikeVideo, subscribe, unsubscribe };