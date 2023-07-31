const User = require("../models/User");
const Video = require("../models/Video");

const getVideo = async (req, res) => {
    try {
        const { id } = req.params;//video id
        const video = await Video.findById(id);

        return res.status(200).json({
            message: `Successfully fetched the video of id:${video.id}`,
            success: true,
            video
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error while fetching the video,error : ${error}`,
            success: false
        });
    }
};

const getTrendVideo = async (req, res) => {
    try {
        const videos = await Video.find().sort({ views: -1 });

        return res.status(200).json({
            message: `Successfully fetched trending videos`,
            success: true,
            videos
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error while fetching the video`,
            success: false
        });
    }
};

//for Home screen
const getRandomVideo = async (req, res) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);

        return res.status(200).json({
            message: `Successfully fetched random videos`,
            success: true,
            videos
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error while fetching random videos`,
            success: false
        });
    }
};

const getSubscribedChannelVideos = async (req, res) => {
    try {
        //get my details using req.user.id to get all subscribedUsers
        const mydetails = await User.findById(req.user.id);
        const subscribedChannels = mydetails.subscribedUsers;// array of subscribed user id

        //it is ->[[{}],[{}]]
        const subscribedVideos = await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.find({ userId: channelId });
            })
        );

        return res.status(200).json({
            message: 'Successfully fetched videos of subscribed channels',
            success: true,
            //to remove extra(internal) array sign
            subscribedVideos: subscribedVideos.flat().sort((a, b) => a.createdAt - b.createdAt)
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error while fetching videos of subscribed channels`,
            success: false
        });
    }
};

const getVideosByTags = async (req, res) => {
    const tags = req.query.tags.split(",");
    try {
        const videosByTags = await Video.find({ tags: { $in: tags } }).limit(20);

        return res.status(200).json({
            message: 'Successfully fetched videos by tags',
            success: false,
            videosByTags
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error while fetching videos By tags,error:${error}`,
            success: false
        });
    }
};

const searchVideos = async (req, res) => {
    const searchQuery = req.query.searchQuery;
    try {
        const searchedVideos = await Video.find({ title: { $regex: searchQuery, $options: "i" } });

        return res.status(200).json({
            message: `Successfully searched the videos.`,
            success: true,
            searchedVideos
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error while searching videos,error:${error}`,
            success: false
        });
    }
};

const createVideo = async (req, res) => {
    try {
        const { id } = req.user;//id of creater
        const addedVideo = await Video.create({ userId: id, ...req.body });

        return res.status(201).json({
            message: `Successfully video is added`,
            success: true,
            addedVideo
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error while adding video,error : ${error}`,
            success: false
        });
    }
};

const updateVideo = async (req, res) => {
    try {
        //each video is associated with some user(as he has created or maintanor of that video)->he can only update that video.
        const { id } = req.params;//check-it should be id of video
        const { id: userId } = req.user;//its my(logedin user) id
        const video = await Video.findById({ userId: id });

        if (!video) {
            return res.status(404).json({
                message: `Video is not found`,
                success: false
            });
        };

        if (userId === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate({ userId: id }, { ...req.body }, { new: true });//if new:false(default)->then in variable updatedVedio->new updated value would not be there

            return res.status(200).json({
                message: `Successfully updated video of title : ${updatedVideo.title}`,
                success: true,
                updatedVideo
            });
        } else {
            return res.status(403).json({
                message: `You can update only your video.`,
                success: false
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: `Error while updating video`,
            success: false
        });
    };
};


const updateView = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedVideo = await Video.findByIdAndUpdate({ userId: id }, { $inc: { views: 1 } }, { new: true });//if new:false(default)->then in variable updatedVedio->new updated value would not be there

        return res.status(200).json({
            message: `Successfully incremented view of video title : ${updatedVideo.title}`,
            success: true,
            updatedVideo
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error while updating view`,
            success: false
        });
    };
};

const deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const { id: userId } = req.user;

        const video = await Video.findById({ userId: id });

        if (!video) {
            return res.status(404).json({
                message: `Video is not found`,
                success: false
            });
        };

        if (userId === video.userId) {
            await Video.findByIdAndDelete({ userId: id });

            return res.status(200).json({
                message: `${video.title} video is deleted successfully.`,
                success: true
            });
        } else {
            return res.status(403).json({
                message: `You can delete only your video.`,
                success: false
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: `Error while updating video`,
            success: false
        });
    }
};

module.exports = {
    getVideo,
    getRandomVideo,
    getTrendVideo,
    getSubscribedChannelVideos,
    getVideosByTags,
    searchVideos,
    createVideo,
    updateVideo,
    updateView,
    deleteVideo
};