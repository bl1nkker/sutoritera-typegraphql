import { MyContext } from 'src/types/MyContext'
import { StoryModel } from './../models/StoryModel'

export const getStories = async() =>{
    return StoryModel.find()
}

export const createStory = async(ctx:MyContext, args:any) =>{
    if (!ctx){
        return { isSuccess: false, message: 'Not authenticated', result:null }
    }
    const { title, content } = args.storyInput
    // When auth will be ready, replace hard coded user id by user id in ctx
    const newUserStory = new StoryModel({ title, content, createdAt: new Date().toISOString(), 
        interestedUsers: [], creator: "536f6d652075736572204990" })
    await newUserStory.save()
    return { isSuccess: true, message: 'Success', result: newUserStory }
} 

export const deleteStory = async(ctx:MyContext, args:any) =>{
    if (!ctx){
        return { isSuccess: false, message: 'Not authenticated', result:null }
    }
    const { storyId } = args
    const documentIsExist = await StoryModel.findById(storyId)
    if (documentIsExist){
        // When auth will be ready, check user id
        // if (documentIsExist._id !== storyId) return { isSuccess: false, message: 'Not a creator', result:null }
        await StoryModel.findByIdAndDelete(storyId)
        return { isSuccess: true, message: 'Success', result: documentIsExist }
    }
    return { isSuccess: false, message: 'Not found', result: null }
}

export const updateStory = async(ctx:MyContext, args:any) =>{
    if (!ctx) return { isSuccess: false, message: 'Not authenticated', result:null }
    const { storyId, storyInput } = args
    const documentIsExist = await StoryModel.findById(storyId)
    if (documentIsExist){
        // When auth will be ready, check user id
        // if (documentIsExist._id !== storyId) return { isSuccess: false, message: 'Not a creator', result:null }

        const updatedStory = {...storyInput, id: storyId}
        await StoryModel.findByIdAndUpdate(storyId, updatedStory)
        return { isSuccess: true, message: 'Success', result: updatedStory}
    }
    return { isSuccess: false, message: 'Not found', result: null }
}