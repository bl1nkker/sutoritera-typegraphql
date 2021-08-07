import mongoose, { Schema } from 'mongoose'

const storySchema:Schema = new mongoose.Schema({
    title:{
        type: String
    },
    content:{
        type: String
    },
    interestedUsers:{
        type: [String]
    },
    // comment:{
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref:'Comment',
    //     autopopulate: true
    // },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        autopopulate: true
    },
    createdAt:{
        type: Date
    }
});

export const StoryModel = mongoose.model("Story", storySchema)