const mongoose = require("mongoose");
const {MongoMemoryServer}= require("mongodb-memory-server");


let mongod;


module.exports.connect = async()=>{
    if(!mongod){
        mongod = await MongoMemoryServer.create();
        const url = mongod.getUri();
        const mongooseOpts = {
            useUnifiedTopology:true,
            maxPoolSize: 10
        }
        mongoose.connect(url, mongooseOpts)
    }
}

module.exports.closeDatabase = async()=>{
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if(mongod){
        await mongod.stop();
    }
}


module.exports.clearDatabase = async()=>{
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        collection.deleteMany();
    }
}