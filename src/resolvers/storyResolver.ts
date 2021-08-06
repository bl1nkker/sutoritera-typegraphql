import { StoryModel } from './../models/StoryModel'

export const getStories = async() =>{
    return StoryModel.find()
}

export const createStory = async(params:any) =>{
    console.log(params.storyInput)
    const { title, content } = params.storyInput
    console.log(title, content)
    const newUserStory = new StoryModel({ title, content })
    await newUserStory.save()
    console.log('Story saved!')
    return newUserStory
} 