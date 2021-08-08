import { MyContext } from 'src/types/MyContext'
import { StoryModel } from './../models/StoryModel'

type StoryType = {
    id: string,
    title: string,
    content: string,
    interestedUsers:string[],
    creator: string,
    createdAt: string
}

export const getStories = async() =>{
    try {
        return StoryModel.find()
    } catch (error) {
        console.log(error)
        return { isSuccess: false, message:error, result:null }
    }
}

export const createStory = async(ctx:MyContext, args:any) =>{
    if (!ctx.req.session?.isAuth){
        return { isSuccess: false, message: 'Not authenticated', result:null }
    }
    try {
        const { title, content } = args.storyInput
        const newUserStory = new StoryModel({ title, content, createdAt: new Date().toISOString(), 
            interestedUsers: [], creator: ctx.req.session.userId })
        const result = await newUserStory.save()
        return { isSuccess: true, message: 'Success', result: result }
    } catch (error) {
        console.log(error)
        return { isSuccess: false, message:error, result:null }
    }
} 

export const deleteStory = async(ctx:MyContext, args:any) =>{
    if (!ctx.req.session?.isAuth){
        return { isSuccess: false, message: 'Not authenticated', result:null }
    }
    try {
        const { storyId } = args
        const existingDocument:StoryType = await StoryModel.findById(storyId)
        if (existingDocument){
            if (String(existingDocument.creator) !== String(ctx.req.session.userId)) return { isSuccess: false, message: 'Not a creator', result:null }
            await StoryModel.findByIdAndDelete(storyId)
            return { isSuccess: true, message: 'Success', result: existingDocument }
        }
        return { isSuccess: false, message: 'Not found', result: null }
    } catch (error) {
        console.log(error)
        return { isSuccess: false, message:error, result:null }
    }
}

export const updateStory = async(ctx:MyContext, args:any) =>{
    if (!ctx.req.session?.isAuth) return { isSuccess: false, message: 'Not authenticated', result:null }
    try {
        const { storyId, storyInput } = args
        const existingDocument:StoryType = await StoryModel.findById(storyId)
        if (existingDocument){
            if (String(existingDocument.creator) !== String(ctx.req.session.userId)) return { isSuccess: false, message: 'Not a creator', result:null }

            const updatedStory = {...storyInput, id: storyId}
            const result = await StoryModel.findByIdAndUpdate(storyId, updatedStory, { new:true })
            return { isSuccess: true, message: 'Success', result: result }
        }
        return { isSuccess: false, message: 'Not found', result: null }
    } catch (error) {
        console.log(error)
        return { isSuccess: false, message:error, result:null }
    }
}

export const interestedInStory = async(ctx:MyContext, args:any) =>{
    if (!ctx.req.session?.isAuth){
        return { isSuccess: false, message: 'Not authenticated', result:null }
    }
    try {
        const { storyId } = args
        const existingDocument:StoryType = await StoryModel.findById(storyId)
        if (existingDocument){
            if (existingDocument.interestedUsers.indexOf(ctx.req.session.userId) !== -1) return { isSuccess: false, message: 'Already interested', result: null }
    
            existingDocument.interestedUsers.push(ctx.req.session.userId)
            const result = await StoryModel.findByIdAndUpdate(storyId, {...existingDocument}, { new:true })
            return { isSuccess: true, message: 'Success', result: result}
        }
        return { isSuccess: false, message: 'Not found', result: null }
    } catch (error) {
        console.log(error)
        return { isSuccess: false, message:error, result:null }
    }
} 

export const unInterestedInStory = async(ctx:MyContext, args:any) =>{
    if (!ctx.req.session?.isAuth){
        return { isSuccess: false, message: 'Not authenticated', result:null }
    }
    try {
        const { storyId } = args
        const existingDocument:StoryType = await StoryModel.findById(storyId)
        if (existingDocument){
            if (existingDocument.interestedUsers.indexOf(ctx.req.session.userId) === -1) return { isSuccess: false, message: 'Not interested', result: null } 
    
            existingDocument.interestedUsers = existingDocument.interestedUsers.filter( _id => _id !== ctx.req.session.userId )
            const result = await StoryModel.findByIdAndUpdate(storyId, {...existingDocument}, { new:true })
            return { isSuccess: true, message: 'Success', result: result }
        }
        return { isSuccess: false, message: 'Not found', result: null }
    } catch (error) {
        console.log(error)
        return { isSuccess: false, message:error, result:null }
    }
} 
