import { testConnection } from './../test-utils/testConnection'
import { graphqlTestCall } from './../test-utils/graphqlTestCall'
import faker from 'faker'
import { UserModel } from './../models/UserModel'
import { createStoryMutation, deleteStoryMutation, interestedInStoryMutation, signUpUserMutation, unInterestedInStoryMutation, updateStoryMutation } from './../test-utils/testQueries'
// import { StoryModel } from './../models/StoryModel'

// Executes BEFORE all tests
beforeAll( async() => {
    testConnection()
})
// Executes AFTER all tests
afterAll(async() => { 
    UserModel.collection.drop()
    // StoryModel.collection.drop()
})
describe("Auth validation", () =>{
    const user = { 
        email:faker.internet.email(), 
        password:faker.internet.password(), 
        name:faker.name.firstName(),
        avatar:faker.image.avatar() 
    }
    it("unauthorized user cannot perform actions", async() =>{
        const story = {
            title: faker.music.genre(),
            content: faker.lorem.sentence()
        }
        const creationResult = await graphqlTestCall({
            source: createStoryMutation,
            variableValues:{
                storyInput: story
            }
        }) 
        expect(creationResult.data!.createStory!.isSuccess).toBeFalsy()
        expect(creationResult.data!.createStory!.message).toMatch("Not authenticated")
        expect(creationResult.data!.createStory!.result).toBeNull()

        const updateResult = await graphqlTestCall({
            source: updateStoryMutation,
            variableValues:{
                storyInput: story,
                storyId: '123'
            }
        }) 
        expect(updateResult.data!.updateStory!.isSuccess).toBeFalsy()
        expect(updateResult.data!.updateStory!.message).toMatch("Not authenticated")
        expect(updateResult.data!.updateStory!.result).toBeNull()

        const deleteResult = await graphqlTestCall({
            source: deleteStoryMutation,
            variableValues:{
                storyId: '123'
            }
        }) 
        expect(deleteResult.data!.deleteStory!.isSuccess).toBeFalsy()
        expect(deleteResult.data!.deleteStory!.message).toMatch("Not authenticated")
        expect(deleteResult.data!.deleteStory!.result).toBeNull()
        const interestedInStoryResult = await graphqlTestCall({
            source: interestedInStoryMutation,
            variableValues:{
                storyId: '123'
            }
        }) 
        expect(interestedInStoryResult.data!.interestedInStory!.isSuccess).toBeFalsy()
        expect(interestedInStoryResult.data!.interestedInStory!.message).toMatch("Not authenticated")
        expect(interestedInStoryResult.data!.interestedInStory!.result).toBeNull()

        const unInterestedInStoryResult = await graphqlTestCall({
            source: unInterestedInStoryMutation,
            variableValues:{
                storyId: '123'
            }
        }) 
        expect(unInterestedInStoryResult.data!.unInterestedInStory!.isSuccess).toBeFalsy()
        expect(unInterestedInStoryResult.data!.unInterestedInStory!.message).toMatch("Not authenticated")
        expect(unInterestedInStoryResult.data!.unInterestedInStory!.result).toBeNull()
    })

    it("authorized user cannot perform actions", async() =>{
        const signUpResponse = await graphqlTestCall({
            source: signUpUserMutation,
            variableValues:{
                userInput: user,
            }
        })
        expect(signUpResponse.data!.signUpUser!.result.token).toBeDefined()
        const currentUserId = signUpResponse.data!.signUpUser!.result.id
        const story = {
            title: faker.music.genre(),
            content: faker.lorem.sentence()
        }

        // Create
        const creationResult = await graphqlTestCall({
            source: createStoryMutation,
            variableValues:{
                storyInput: story
            },
            userId: currentUserId,
            isAuth: true
        }) 
        expect(creationResult.data!.createStory!.isSuccess).toBeTruthy()
        expect(creationResult.data!.createStory!.message).toMatch("Success")
        expect(creationResult.data!.createStory!.result.title).toMatch(story.title)
        expect(creationResult.data!.createStory!.result.creator).toMatch(currentUserId)
        expect(creationResult.data!.createStory!.result.content).toMatch(story.content)
        expect(creationResult.data!.createStory!.result.id).toBeDefined()
        const currentStoryId = creationResult.data!.createStory!.result.id

        // Update
        const updatedStory = {
            title: faker.music.genre(),
            content: faker.lorem.sentence()
        }
        const updateResult = await graphqlTestCall({
            source: updateStoryMutation,
            variableValues:{
                storyInput: updatedStory,
                storyId: currentStoryId
            },
            userId: currentUserId,
            isAuth: true
        }) 
        expect(updateResult.data!.updateStory!.isSuccess).toBeTruthy()
        expect(updateResult.data!.updateStory!.message).toMatch("Success")
        expect(updateResult.data!.updateStory!.result.title).toMatch(updatedStory.title)
        expect(updateResult.data!.updateStory!.result.content).toMatch(updatedStory.content)
        expect(updateResult.data!.updateStory!.result.id).toBeDefined()

        const interestedInStoryResult = await graphqlTestCall({
            source: interestedInStoryMutation,
            variableValues:{
                storyId: currentStoryId
            },
            userId: currentUserId,
            isAuth: true
        }) 
        expect(interestedInStoryResult.data!.interestedInStory!.isSuccess).toBeTruthy()
        expect(interestedInStoryResult.data!.interestedInStory!.message).toMatch("Success")
        expect(interestedInStoryResult.data!.interestedInStory!.result.interestedUsers).toContain(currentUserId)

        const unInterestedInStoryResult = await graphqlTestCall({
            source: unInterestedInStoryMutation,
            variableValues:{
                storyId: currentStoryId
            },
            userId: currentUserId,
            isAuth: true
        }) 
        expect(unInterestedInStoryResult.data!.unInterestedInStory!.isSuccess).toBeTruthy()
        expect(unInterestedInStoryResult.data!.unInterestedInStory!.message).toMatch("Success")
        expect(unInterestedInStoryResult.data!.unInterestedInStory!.result.interestedUsers).not.toContain(currentUserId)

        const deleteResult = await graphqlTestCall({
            source: deleteStoryMutation,
            variableValues:{
                storyId: currentStoryId
            },
            userId: currentUserId,
            isAuth: true
        }) 
        expect(deleteResult.data!.deleteStory!.isSuccess).toBeTruthy()
        expect(deleteResult.data!.deleteStory!.message).toMatch("Success")
        expect(deleteResult.data!.deleteStory!.result.creator).toMatch(currentUserId)
    })

})