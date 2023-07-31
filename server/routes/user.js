const express = require('express');

const verifyToken = require("../utils/verifyToken")
const { getUser, updateUser, deleteUser, likeVideo, dislikeVideo, subscribe, unsubscribe } = require("../controller/user");

const router = express.Router();

//get a user->for seeing any user accout,do not need to be signed in.
router.get("/find/:id", getUser);
//update a user->for updating your account details->you need to to be signed in.
router.put("/update/:id", verifyToken, updateUser);
//delete a user->for deleting your account-> you need to to be signed in.
router.delete("/delete/:id", verifyToken, deleteUser);

//like a user->for liking any vedio ,you have to be signed in.
router.put("/like/:videoId", verifyToken, likeVideo);
//dislike->for disliking any vedio ,you have to be signed in
router.put("/dislike/:videoId", verifyToken, dislikeVideo);

//subscribe a user-> for subscribing any user channel,you have to be signed in.
router.put("/subscribe/:id", verifyToken, subscribe);//id->this id(req.params.id) of other user whose channel I(req.user.id) am going to subscribe
//unsubscribe a user->for unsubscribing any user channel,you have to be signed in.
router.put("/unsubscribe/:id", verifyToken, unsubscribe);

module.exports = router;