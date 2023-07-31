const express=require('express');

const commentRouter=require('./routes/comment');
const userRouter=require('./routes/user');
const videoRouter=require('./routes/video');
const authRouter=require('./routes/auth');

const router=express.Router();

router.use('/comment',commentRouter);
router.use('/user',userRouter);
router.use('/video',videoRouter);
router.use('/auth',authRouter);

module.exports=router;

