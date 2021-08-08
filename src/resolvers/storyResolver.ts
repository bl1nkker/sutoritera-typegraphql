import { MyContext } from 'src/types/MyContext'
import { StoryModel } from './../models/StoryModel'

const TEMP_USER_ID:string = '536f6d652075736572204990'
type IStory = {
    id: string,
    title: string,
    content: string,
    interestedUsers:string[],
    creator: string,
    createdAt: string
}

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
        interestedUsers: [], creator: TEMP_USER_ID })
    const result = await newUserStory.save()
    return { isSuccess: true, message: 'Success', result: result }
} 

export const deleteStory = async(ctx:MyContext, args:any) =>{
    if (!ctx){
        return { isSuccess: false, message: 'Not authenticated', result:null }
    }
    const { storyId } = args
    const existingDocument:IStory = await StoryModel.findById(storyId)
    if (existingDocument){
        // When auth will be ready, check user id
        // if (existingDocument._id !== storyId) return { isSuccess: false, message: 'Not a creator', result:null }
        await StoryModel.findByIdAndDelete(storyId)
        return { isSuccess: true, message: 'Success', result: existingDocument }
    }
    return { isSuccess: false, message: 'Not found', result: null }
}

export const updateStory = async(ctx:MyContext, args:any) =>{
    if (!ctx) return { isSuccess: false, message: 'Not authenticated', result:null }
    const { storyId, storyInput } = args
    const existingDocument:IStory = await StoryModel.findById(storyId)
    if (existingDocument){
        // When auth will be ready, check user id
        // if (existingDocument.creator !== ctx) return { isSuccess: false, message: 'Not a creator', result:null }

        const updatedStory = {...storyInput, id: storyId}
        const result = await StoryModel.findByIdAndUpdate(storyId, updatedStory, { new:true })
        return { isSuccess: true, message: 'Success', result: result }
    }
    return { isSuccess: false, message: 'Not found', result: null }
}

export const interestedInStory = async(ctx:MyContext, args:any) =>{
    if (!ctx){
        return { isSuccess: false, message: 'Not authenticated', result:null }
    }
    const { storyId } = args
    const existingDocument:IStory = await StoryModel.findById(storyId)
    if (existingDocument){
        if (existingDocument.interestedUsers.indexOf(TEMP_USER_ID) !== -1) return { isSuccess: false, message: 'Already interested', result: null }

        existingDocument.interestedUsers.push(TEMP_USER_ID)
        const result = await StoryModel.findByIdAndUpdate(storyId, {...existingDocument}, { new:true })
        return { isSuccess: true, message: 'Success', result: result}
    }
    return { isSuccess: false, message: 'Not found', result: null }
} 

export const unInterestedInStory = async(ctx:MyContext, args:any) =>{
    if (!ctx){
        return { isSuccess: false, message: 'Not authenticated', result:null }
    }
    const { storyId } = args
    const existingDocument:IStory = await StoryModel.findById(storyId)
    if (existingDocument){
        if (existingDocument.interestedUsers.indexOf(TEMP_USER_ID) === -1) return { isSuccess: false, message: 'Not interested', result: null } 

        existingDocument.interestedUsers = existingDocument.interestedUsers.filter( _id => _id !== TEMP_USER_ID )
        const result = await StoryModel.findByIdAndUpdate(storyId, {...existingDocument}, { new:true })
        return { isSuccess: true, message: 'Success', result: result }
        
    }
    return { isSuccess: false, message: 'Not found', result: null }
} 
