const express = require('express');
const { getVideo, searchVideos, createVideo, updateVideo, deleteVideo,
    getTrendVideo, getRandomVideo, updateView, getSubscribedChannelVideos, getVideosByTags } = require('../controller/video');
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

//get a video
router.get('/find/:id', getVideo);

router.get('/trend', getTrendVideo);

router.get('/random', getRandomVideo);

//subscrived Channel Vedios
router.get('/subscribedChannel', verifyToken, getSubscribedChannelVideos);

router.get('/tags', getVideosByTags);

router.get('/search', searchVideos);
//create a video
// re.user.id->userId(video owner id) to check the video owner.
router.post('/add', verifyToken, createVideo);

//update a video
router.put('/update/:id', verifyToken, updateVideo);

//update view->check the logic
router.put("/updateView/:id", updateView);

//
//delete a video
router.delete('/delete/:id', verifyToken, deleteVideo);

module.exports = router;