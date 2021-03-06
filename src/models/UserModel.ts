import mongoose, { Schema } from 'mongoose'

const userSchema:Schema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    avatar:{
        type: String
    },
    friendsList:{
        type: [String]
    },
    createdStories:{
        type: [mongoose.Schema.Types.ObjectId]
    },
    interestingStories:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'Story',
        autopopulate: true
    },
    lastOnline:{
        type: String
    },
    isOnline:{
        type: Boolean
    },
    // comments:{
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref:'Comment',
    //     autopopulate: true
    // }
});

export const UserModel = mongoose.model("User", userSchema)