const mongoose=require('mongoose');
const {MONGO_URI}=require('./index');

const connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`successfully connected to the db`)
    }).catch((e) => {
        console.log(`connection failed,error:` + e);
    })
};

module.exports=connect;