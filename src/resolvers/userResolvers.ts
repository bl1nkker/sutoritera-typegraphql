import { StoryModel } from './../models/StoryModel'
// import { UserModel } from './../models/UserModel'

export const getCreatedStories = async() =>{
    // Get created ID
    return StoryModel.find({ creator: "536f6d652075736572204944" })
}