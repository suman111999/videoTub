const express = require('express');
const { addComment, getComments, deleteComment } = require('../controller/comment');
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

router.post('/add', verifyToken, addComment);

//get comments associated with a video
router.get('/find/:videoId', getComments);

router.delete('/delete/:id', verifyToken, deleteComment);

module.exports = router;